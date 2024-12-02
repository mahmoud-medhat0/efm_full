<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="{{asset('assets/logo.png')}}" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    @viteReactRefresh
    @vite('resources/css/app.css')
    @vite('resources/js/app.jsx')
    <!--<script src="https://support.eng-money.com/supportboard/js/min/jquery.min.js"></script>-->
    <!--<script id="sbinit" src="https://support.eng-money.com/supportboard/js/main.js"></script>-->
    <script>window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}</script><script id="zsiqscript" src="https://salesiq.zohopublic.com/widget?wc=siq7b95603eb3c079c19ccb32d4c3143cb407d5d4fbe10b7db3412618b2b797cca1" defer></script>
    <!-- TrustBox script -->
<script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>
<!-- End TrustBox script -->
    @inertiaHead
    @routes('client')
    <style>
      .trustpilot-widget-modal {
        display: none; /* Hidden by default */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        z-index: 1000; /* Ensure it appears above other elements */
        justify-content: center;
        align-items: center;
      }

      .trustpilot-widget-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        width: 80%;
        max-width: 600px;
      }

      .close-button {
        float: right;
        cursor: pointer;
        font-size: 20px;
      }

      #openModalButton {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #00e686; /* Change to your preferred color */
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1001; /* Ensure it appears above other elements */
      }
    </style>
  </head>
  <body>
    @inertia
    <button id="openModalButton">&#9733;</button>

    <!-- TrustBox widget as a modal -->
    <div id="trustpilotModal" class="trustpilot-widget-modal">
      <div class="trustpilot-widget-content">
        <span class="close-button" id="closeModalButton">&times;</span>
        <div class="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="6738735cbd0add586d443251" data-style-height="52px" data-style-width="100%">
          <a href="https://www.trustpilot.com/review/efmhub.com" target="_blank" rel="noopener">Trustpilot</a>
        </div>
      </div>
    </div>
    <script>
      document.getElementById('openModalButton').addEventListener('click', function() {
        document.getElementById('trustpilotModal').style.display = 'flex';
      });

      document.getElementById('closeModalButton').addEventListener('click', function() {
        document.getElementById('trustpilotModal').style.display = 'none';
      });

      // Close the modal when clicking outside of the content
      window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('trustpilotModal')) {
          document.getElementById('trustpilotModal').style.display = 'none';
        }
      });
    </script>
  </body>
</html>