<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction Invoice</title>
    <link rel="stylesheet" href="{{ $base_url }}/invoiceassets/css/Invoice.css">
</head>
<body>
    <header class="header">
        <div class="top-bar">
            <div class="gold-bar">
            </div>
            <div class="black-bar"></div>
        </div>
    </header>
    <main class="main-content">
        <div class="invoice-header">
            <div class="logo-section">
                <img src="{{ $base_url }}/invoiceassets/photo/Group.svg" alt="EFM Logo" class="logo">
                <img src="{{ $base_url }}/invoiceassets/photo/line2.svg" alt="EFM Logo" class="line2" />
                <div class="titel3">
                    <h2>EFM</h2>
                    <p>Earn Free Money</p>
                    <p>{{ $client->transactions->where('type', 'membership')->first()->txn }}<span>رقم مرجعي </span></p>
                </div>
            </div>
            <div class="invoice-title">

                <h1>فاتورة معاملة
                    <br />
                    Transaction Invoice
                </h1>
                    <img src="{{ $base_url }}/invoiceassets/photo/line1.svg" alt="EFM Logo" class="line1" />
            </div>
            <div class="invoice-info">
                <p><strong>رقم الفاتورة</strong>: {{ $client->transactions->where('type', 'membership')->first()->txn }}</p>
                <p><strong>الاسم</strong>: {{ $client->name }}</p>
                <p><strong>التاريخ</strong>: {{ $client->transactions->where('type', 'membership')->first()->created_at->format('d/m/Y') }}</p>
            </div>
        </div>
        <center>
        <div class="highlight-bar">
            العضوية المميزة
        </div>
        </center>
        <section class="invoice-details">
            <div class="content-box">
                <div class="welcome-message">
                    <p>
                        .مرحباً بك في شركة <span>EFM</span> نحن سعداء جداً بانضمامك إلينا ونعني لك تجربة رائعة مليئة
                        بالتحديات والفرص الجديدة.
                    </p>
                    <p>انضمامك للعضوية هو بداية جديدة نحو عالم من الرُقي، ثق أنك ستستفيد كثيراً
                        من جميع المزايا التي تقدمها العضوية في <span>EFM</span>.</p>
                </div>
                <ul class="benefits" dir="rtl">
                    <li><div><span>عضوية مميزة مدى الحياة</span></div></li>
                    <li><div><span>باب لزيادة دخلك الشهري</span></div></li>
                    <li><div><span>عمولات تسويقية رائعة ومستمرة</span></div></li>
                    <li><div><span>ورش عمل مميزة لتطوير مهارات التسويق</span></div></li>
                    <li><div><span>دورة استثمار شهرية ومستمرة</span></div></li>
                    <li><div><span>مسابقات وجوائز لا حصر لها</span></div></li>
                </ul>
            </div>
            <div class="card">
                <div class="card-header">
                    قيمة العضوية
                </div>
                <div class="card-body">
                    <ul>
                        <li>
                            <span>{{ $membership }} EGP</span>
                            <span>سعر العضوية</span>
                        </li>
                        <li>
                            <span>{{ $discount }}%</span>
                            <span>خصم </span>
                        </li>
                        <li>
                            <span>{{ $membership - ($discount * $membership / 100) }} EGP</span>
                            <span>سعر العضوبة بعد الخصم</span>
                        </li>
                    </ul>
                    <p>تنضاف فيهة الضية المصامة علي سعر العضوية%14</p>
                </div>
            </div>
            <div class="card-numbers">
                <p>
                    <span>رفم البطاقه الضريبيه</span>
                    <span>293302626014926.92</span>
                </p>
                <p>

                    <span>رقم السجل التجاري</span>
                    <span>235849</span>
                </p>

            </div>
        </section>
        <center>
        <div class="custom-button">
            <div class="left-part">
                {{ $client->transactions->where('type', 'membership')->first()->total }} EGP
            </div>
            <div class="right-part">
                اجمالي
            </div>
        </div>
        </center>
        <p class="note"><span>ملاحظه</span> الشركة نحضع للشوط والنحكام القانوببة المعنمحة</p>
    </main>

    <footer class="footer">
        <div class="footer-container">
            <div class="footer-item">
                <img src="{{ $base_url }}/invoiceassets/photo/Group (2).svg" alt="EFM Logo" />
                <span class="efm-titel">hub</span>
                <p style="color:  #808080;">
                    EFM is the strongest company<br /> for making money online,<br /> offering unparalleled
                    features<br /> and strong rewards that makes <br />it the best choice for every one
                <p style="color:  #808080;">Copyright © EFM 2024</p>
                </p>
            </div>
            <div class="footer-item">
                <h4 style="color: #d3b489;">Services</h4>
                <p>E-Marketing</p>
                <p>SEO</p>
                <p>Content Management</p>
                <p>Earn Money Online</p>
                <p>Affiliate System</p>
            </div>
            <div class="footer-item">
                <h4 style="color: #d3b489;">Contact Us</h4>
                <p><img src="{{ $base_url }}/invoiceassets/photo/phone.svg" alt="Email Icon" style="width: 16px; height:16px; "><a href="mailto:support@efmhub.com" style="color: inherit; text-decoration: none;">support@efmhub.com</a>
                </p>
                <p><img src="{{ $base_url }}/invoiceassets/photo/Email.svg" alt="Phone Icon" style="width: 16px; height:16px; "><a href="tel:+20120655342" style="color: inherit; text-decoration: none;">+20120655342</a></p>
                <p><img src="{{ $base_url }}/invoiceassets/photo/Vector (4).svg" alt="Twitter Icon" style="width: 16px; height:16px; "><a href="https://t.me/EFM_Hub" target="_blank" style="color: inherit; text-decoration: none;">@EFM_Hub</a></p>
            </div>
        </div>
        <div class="bottom-bar">
            <div class="bottom-barblack"></div>
            <div class="bottom-bargold"></div>
        </div>
    </footer>
</body>
</html>