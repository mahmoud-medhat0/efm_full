<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Service;
use App\Models\InterestCategory;
use App\Models\Order;
use App\Models\Transaction;
use Alaouy\Youtube\Rules\ValidYoutubeVideo;
use Laravel\Nova\Notifications\NovaNotification;
use Alaouy\Youtube\Facades\Youtube;
use DateInterval;
class OrdersController extends Controller
{
    public function orders()
    {
        return Inertia::render('newui/Component/DashBoard/Orders/Order.jsx', [
            'orders' => auth()->user()->orders()->get()->toArray()
        ]);
    }
    public function newOrder()
    {
        return Inertia::render('newui/Component/DashBoard/NewOrder/NewOrder.jsx', [
            'services' => Service::where('status', 'active')->get()->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'icon' => $service->icon,
                    'min' => $service->min_amount,
                    'max' => $service->max_amount,
                    'time_type' => $service->time_type,
                    // 'minute_cost' => json_decode($service->calculation_formula, true)['minute_cost'],
                ];
            }),
            'categories' => InterestCategory::all()->toArray()
        ]);
    }
    public function YtVideoDetails(Request $request)
    {
        $validator = Validator::make(['url' => $request->url], [
            'url' => ['required', 'bail', new ValidYoutubeVideo],
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $videoId = Youtube::parseVidFromURL($request->url);
        $video = Youtube::getVideoInfo($videoId);
        if ($video) {
            $thumbnail = $video->snippet->thumbnails->standard->url;
            $title = $video->snippet->title;
            $viewCount = number_format($video->statistics->viewCount);
            $likeCount = number_format($video->statistics->likeCount);
            $duration = iso8601ToDuration($video->contentDetails->duration);
            $interval = new DateInterval($video->contentDetails->duration);
            $minutes = ($interval->d * 24 * 60) + ($interval->h * 60) + $interval->i + number_format($interval->s / 60, 2);
            return response()->json(['success' => true, 'message' => 'Video details fetched successfully', 'thumbnail' => $thumbnail, 'title' => $title, 'viewCount' => $viewCount, 'likeCount' => $likeCount, 'duration' => $duration, 'minutes' => $minutes]);
        } else {
            return response()->json(['success' => false, 'message' => 'Video details Cant fetched', 'duration' => '']);
        }
    }
    public function newOrderPost(Request $request)
    {
        $rules = [
            'service_id' => ['required', 'exists:services,id'],
            'link' => ['required', 'url'],
            'amount' => ['required', 'numeric', 'min:' . Service::find($request->service_id)->min_amount, 'max:' . Service::find($request->service_id)->max_amount],
            'order_type' => ['required', 'string', 'in:full_time,custom_time'],
            'time_start' => ['required_if:order_type,custom_time', 'numeric', 'min:0'],
            'time_end' => ['required_if:order_type,custom_time', 'numeric', 'min:1', 'gt:time_start'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $service = Service::find($request->service_id);
        if ($service->is_category_required) {
            $rules['categories'] = ['required', 'array'];
            $rules['categories.*'] = ['exists:interest_categories,id'];
        }
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        if ($request->service_id == "1") {
            $videoId = Youtube::parseVidFromURL($request->link);
            $video = Youtube::getVideoInfo($videoId);
            $interval = new DateInterval($video->contentDetails->duration);
            $minutes = ($interval->d * 24 * 60) + ($interval->h * 60) + $interval->i + number_format($interval->s / 60, 2);
            $price = $request->amount * ($minutes * json_decode($service->calculation_formula, true)['minute_cost']);
            $user = auth()->user();
            $thumbnail = $video->snippet->thumbnails->standard->url;
            $title = $video->snippet->title;
            if ($user->balance < $price) {
                return response()->json(['success' => false, 'message' => 'Insufficient balance to place the order'], 200);
            }
            Transaction::create([
                'amount' => $price,
                'fee' => 0,
                'total' => $price,
                'tnx_type' => 'sub',
                'tnx' => 'ORD' . time(),
                'type' => 'order',
                'description' => 'Order from ' . $service->name,
                'client_id' => auth()->user()->id,
            ]);
            foreach (json_decode($service->fields, true) as $field => $value) {
                $orderdata[$field] = isset(${$field}) ? ${$field} : null;
            }
            auth()->user()->update(['balance' => auth()->user()->balance - $price]);
            $order = Order::create([
                'order_id' => 'ORD' . time(),
                'provider_id' => auth()->user()->id,
                'service_id' => $request->service_id,
                'link' => $request->link,
                'target_amount' => $request->amount,
                'price' => $price,
                'status' => 'pending',
                'data' => json_encode($orderdata),
                'order_type' => $request->order_type,
                'time_start' => $request->time_start,
                'time_end' => $request->time_end,
            ]);
            if ($service->is_category_required) {
                $order->categories()->sync($request->categories);
            }
        } else {
            $price = $request->amount * $service->minute_cost;
        }

        return response()->json(['success' => true, 'message' => 'Order created successfully', 'price' => $price]);
    }
}
