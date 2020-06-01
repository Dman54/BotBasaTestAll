// charts drawing 
$(function () {
  /* ChartJS
   * -------
   * Here we will create a few charts using ChartJS
   */

  //--------------
  //- AREA CHART -
  //--------------

  // Get context with jQuery - using jQuery's .get() method.
  var areaChartCanvas = $("#areaChart").get(0).getContext("2d");

  var areaChartData = {
    labels: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
    ],
    datasets: [{
        label: "Telegram",
        backgroundColor: "rgba(60,141,188,0.9)",
        borderColor: "rgba(60,141,188,0.8)",
        pointRadius: false,
        pointColor: "#3b8bba",
        pointStrokeColor: "rgba(60,141,188,1)",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(60,141,188,1)",
        data: [28, 48, 40, 19, 86, 27, 90],
      },
      {
        label: "Facebook",
        backgroundColor: "rgba(210, 214, 222, 1)",
        borderColor: "rgba(210, 214, 222, 1)",
        pointRadius: false,
        pointColor: "rgba(210, 214, 222, 1)",
        pointStrokeColor: "#c1c7d1",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "Instagram",
        backgroundColor: "rgba(180, 150, 70, 1)",
        borderColor: "rgba(180, 150, 70, 1)",
        pointRadius: false,
        pointColor: "rgba(180, 150, 70, 1)",
        pointStrokeColor: "#dee",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(180, 150, 70, 1)",
        data: [70, 62, 10, 30, 40, 50, 60],
      },
    ],
  };

  var areaChartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: true,
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        },
      }, ],
      yAxes: [{
        gridLines: {
          display: false,
        },
      }, ],
    },
  };

  // This will get the first returned node in the jQuery collection.
  var areaChart = new Chart(areaChartCanvas, {
    type: "line",
    data: areaChartData,
    options: areaChartOptions,
  });
  // });

  // $(function () {
  //   //-------------
  //   //- LINE CHART -
  //   //--------------
  //   var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
  //   var lineChartOptions = jQuery.extend(true, {}, areaChartOptions);
  //   var lineChartData = jQuery.extend(true, {}, areaChartData);
  //   for (let index = 0; index < lineChartData.datasets.length; index++) {
  //     lineChartData.datasets[index].fill = false;
  //   }
  //   // lineChartData.datasets[0].fill = false;
  //   // lineChartData.datasets[1].fill = false;
  //   // lineChartData.datasets[2].fill = false;
  //   lineChartOptions.datasetFill = true;

  //   var lineChart = new Chart(lineChartCanvas, {
  //     type: "line",
  //     data: lineChartData,
  //     options: lineChartOptions,
  //   });

  //   //-------------
  //   //- BAR CHART -
  //   //-------------
  //   var barChartCanvas = $("#barChart").get(0).getContext("2d");
  //   var barChartData = jQuery.extend(true, {}, areaChartData);
  //   // можно поменять порядок источников
  //   // var temp0 = areaChartData.datasets[0]
  //   // var temp1 = areaChartData.datasets[1]
  //   // var temp2 = areaChartData.datasets[2]
  //   // barChartData.datasets[0] = temp2
  //   // barChartData.datasets[1] = temp0
  //   // barChartData.datasets[2] = temp1

  //   var barChartOptions = {
  //     responsive: true,
  //     maintainAspectRatio: true,
  //     datasetFill: true,
  //   };

  //   var barChart = new Chart(barChartCanvas, {
  //     type: "bar",
  //     data: barChartData,
  //     options: barChartOptions,
  //   });

  //   /*
  //   //---------------------
  //   //- STACKED BAR CHART -
  //   //---------------------
  //   var stackedBarChartCanvas = $('#stackedBarChart').get(0).getContext('2d')
  //   var stackedBarChartData = jQuery.extend(true, {}, barChartData)

  //   var stackedBarChartOptions = {
  //     responsive: true,
  //     maintainAspectRatio: false,
  //     scales: {
  //       xAxes: [{
  //         stacked: true,
  //       }],
  //       yAxes: [{
  //         stacked: true
  //       }]
  //     }
  //   }

  //   var stackedBarChart = new Chart(stackedBarChartCanvas, {
  //     type: 'bar',
  //     data: stackedBarChartData,
  //     options: stackedBarChartOptions
  //   })
  //   */

  //   //-------------
  //   //- DONUT CHART -
  //   //-------------
  //   // Get context with jQuery - using jQuery's .get() method.
  //   var donutChartCanvas = $("#donutChart").get(0).getContext("2d");
  //   var donutData = {
  //     labels: [
  //       "Русский",
  //       "Английский",
  //       "Китайский",
  //       "Немецкий",
  //       "Украинский",
  //       "Другие",
  //     ],
  //     datasets: [{
  //       data: [700, 900, 800, 333, 150, 123],
  //       backgroundColor: [
  //         "#f56954",
  //         "#00a65a",
  //         "#f39c12",
  //         "#00c0ef",
  //         "#3c8dbc",
  //         "#d2d6de",
  //       ],
  //     }, ],
  //   };
  //   var donutOptions = {
  //     maintainAspectRatio: true,
  //     responsive: true,
  //   };
  //   //Create pie or douhnut chart
  //   // You can switch between pie and douhnut using the method below.
  //   var donutChart = new Chart(donutChartCanvas, {
  //     type: "doughnut",
  //     data: donutData,
  //     options: donutOptions,
  //   });

  //   /*
  //   //-------------
  //   //- PIE CHART -
  //   //-------------
  //   // Get context with jQuery - using jQuery's .get() method.
  //   var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
  //   var pieData = donutData;
  //   var pieOptions = {
  //     maintainAspectRatio: false,
  //     responsive: true,
  //   }
  //   //Create pie or douhnut chart
  //   // You can switch between pie and douhnut using the method below.
  //   var pieChart = new Chart(pieChartCanvas, {
  //     type: 'pie',
  //     data: pieData,
  //     options: pieOptions
  //   })
  //   */
  // });


  // $(function () {

  // изменение текущего канала и его контента при переключении слайдов в Dashboard
  let $carousel = $('#carouselExampleIndicators');
  let channelStats = $('.channel-stats');
  let channelChart = $('.channel-chart');

  $carousel.bind('slide.bs.carousel', function (e) {

    id = $(e.relatedTarget).find('.channel-id')[0].textContent;
    GlobalNameChannel = allChannels.find(function (element) {
      return element.id == id;
    });
    $(channelStats.find('h3')).each(function () {
      $(this).text(GlobalNameChannel.members_count);
    });
    GlobalNameChannel = GlobalNameChannel.title;
    GlobalIdChannel = id;
    $('[data-ids="CurrentChannelNumber"]').html(id);
    $('[data-ids="CurrentChannelName"]').html(GlobalNameChannel);
    // channelChart
    var areaChart = new Chart(areaChartCanvas, {
      type: "line",
      data: areaChartData,
      options: areaChartOptions,
    });

  });
});