<?php

namespace App\Nova;

use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Resource as NovaResource;
use Illuminate\Http\Request;

abstract class Resource extends NovaResource
{
    protected static $model;
    protected static $className;

    public static function getClassName()
    {
        $className = get_class(new static::$model);
        $classNameParts = explode('\\', $className);
        $lastPart = end($classNameParts);
        return $lastPart;
    }
    /**
     * Build an "index" query for the given resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function indexQuery(NovaRequest $request, $query)
    {
        return $query;
    }

    /**
     * Build a Scout search query for the given resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  \Laravel\Scout\Builder  $query
     * @return \Laravel\Scout\Builder
     */
    public static function scoutQuery(NovaRequest $request, $query)
    {
        return $query;
    }

    /**
     * Build a "detail" query for the given resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function detailQuery(NovaRequest $request, $query)
    {
        return parent::detailQuery($request, $query);
    }

    /**
     * Build a "relatable" query for the given resource.
     *
     * This query determines which instances of the model may be attached to other resources.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function relatableQuery(NovaRequest $request, $query)
    {
        return parent::relatableQuery($request, $query);
    }
    public static function authorizedToCreate(Request $request)
    {
        return auth('admin')->user()->can('create' . static::getClassName());
    }
    public function authorizedToUpdate(Request $request)
    {
        return auth('admin')->user()->can('update' . static::getClassName());
    }
    public function authorizedToDelete(Request $request)
    {
        return auth('admin')->user()->can('delete' . static::getClassName());
    }
    public function authorizedToView(Request $request)
    {
        return auth('admin')->user()->can('view' . static::getClassName());
    }
    public static function authorizedToViewAny(Request $request)
    {
        return auth('admin')->user()->can('viewAny' . static::getClassName());
    }
    public function authorizedToReplicate(Request $request)
    {
        return false;
    }
}
