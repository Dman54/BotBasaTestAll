// скрипты для открытия и закрытия меню на небольших экранах (клик по гамбургеру и значку закрытия или самому новому меню)
$("#gamburger_added, #closeicon_added").on("click", function (e) {
  $(".navbar-nav_added").toggleClass("displayok");
  $("body").toggleClass("modal-open");
  $("#closeicon_added").toggleClass("displayok");
});
$(".navbar-nav_added").on("click", function (e) {
  if ($(".navbar-nav_added").hasClass("displayok")) {
    $(".navbar-nav_added").toggleClass("displayok");
    $("body").toggleClass("modal-open");
    $("#closeicon_added").toggleClass("displayok");
  }
});
// код для отображения формы поиска при клике на иконку поиска на маленьких экранах
$("#searchhover_added").on("click", function (e) {
  $(".nav-header_added .form-inline").toggleClass("displayok");
});

let roleNavList = $("nav[data-selectRoleContent_added]");
let roleList = $("ul[data-selectRole_added='true'] li a");
let AllRoleSections = $("[data-sectionNumber]");
let AllRoleLinks = $("[data-sectionContent]");

// загрузка разного основного контента в зависимости от активного пункта меню слева
AllRoleLinks.on("click", function (e) {
  e.preventDefault();
  if ($(this).hasClass("active")) return;
  let indexOfAllRoleLinks = $(this).attr('data-sectionContent');
  AllRoleLinks.removeClass("active");
  AllRoleSections.removeClass("active");
  $(this).addClass("active");
  $(`[data-sectionNumber=${indexOfAllRoleLinks}]`).addClass("active");
});

// Смена стилей и панели навигации для активной роли и для активного пукта меню
roleList.on("click", function (e) {
  if ($(this).hasClass("active")) return;
  roleList.removeClass("active");
  $(this).addClass("active");
  roleNavList.removeClass("displayok");
  let indexOfRoleList = roleList.index($(this));
  $(roleNavList.get(indexOfRoleList)).addClass("displayok");
  roleNavList.find('.channels-link').get(indexOfRoleList).click();
});

// Отображение всех категорий при клике
$(".more-categories-button").on("click", function (e) {
  e.preventDefault();
  $(".more-categories-list").toggleClass("hide");
});
// Отображение расширенного поиска при клике
$(".button-extended").on("click", function (e) {
  e.preventDefault();
  $(".extended-search-container").toggleClass("hide");
});

// date creation
function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

let days = ['Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

function printDay(now, withYear = false) {
  return '' + days[now.getDay()] + ', ' + ((now.getDate() < 10) ? ('0' + now.getDate()) : (now.getDate())) + '.' +
    ((now.getMonth() < 9) ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1)) + ((withYear) ? ('.' + now
      .getFullYear()) : '');
}

function printDayHTML(now, withYear = false) {
  let weekend = now.getDay() == 0 || now.getDay() == 6;
  return '<span class="calendarDate' + ((weekend) ? (' weekendDay') : ('')) + '"><span class="dayName">' + days[now
      .getDay()] +
    '</span>, <span class="dayNumber">' + ((now
      .getDate() < 10) ? ('0' + now.getDate()) : (now.getDate())) +
    '</span>.<span class="monthNumber">' +
    ((now.getMonth() < 9) ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1)) + '</span>' + ((withYear) ? ('.' +
      now
      .getFullYear()) : '') + '</span>';
}

let WeekBegin = new Date();
WeekBegin = getMonday(WeekBegin.setDate(WeekBegin.getDate() - 7));
for (let i = 0; i < 21; i++) {
  $($(".calendarList .calendarList-item").get(i)).prepend("" + printDayHTML(WeekBegin) + "");
  // console.log(printDay(WeekBegin));
  WeekBegin.setDate(WeekBegin.getDate() + 1);
}

// pagination
let buttonsToSidebar;
let GlobalIdChannel = null;
let GlobalNameChannel = null;
let dataContainer = $('#channelsList .data-container');
$('#channelsList').pagination({
  dataSource: allChannels,
  pageSize: 10,
  className: 'paginationjs-theme-blue paginationjs-big',
  callback: function (data, pagination) {
    dataContainer.html(templateAll(data));
    buttonsToSidebar = $("[data-widget='control-sidebar2']");
    buttonsToSidebar.on('click', ChangeRightSidebar);
    changeRaitingListeners();
  }
})

// right sidebar open\close and reload content
$("#closeicon2_added").on('click', function () {
  sidebar.removeClass('show');
});
let sidebar = $("#rightaside");

function DrawRightSidebar(element) {
  sidebar.find('.channel-selected').html(`<div class="id-channel-text">Номер текущего канала: <span id='id-channel-in-rightsidebar'>${element.id}</span></div>
    <div class="channel-img">
      <img src="tgstat_images/4c56ff4ce4aaf9573aa5dff913df997a.jpg" alt="${element.title}<">
    </div>
    <h3 class="channel-name">${element.title}</h3>
    <div class="channel-category">Юмор и развлечения</div>
    <div class="channel-adprice"><span>Стоимость рекламы </span> <span>700р</span></div>
    <div class="channel-description">
      ${element.description}
    </div>
    <div class="channel-bot">Бот для продвижения <span>no</span></div>
    <div class="channel-subscribes">
      <!-- <div class="channel-subscribes-name">Подписчики</div> -->
      <div class="channel-subscribes-all"><span>Всего </span> <span>${element.members_count}</span></div>
      <div class="channel-subscribes-day"><span>за день </span> <span>-1 600</span></div>
      <div class="channel-subscribes-week"><span>за неделю </span> <span>-9 200</span></div>
      <div class="channel-subscribes-mounth"><span>за месяц </span> <span>-3 800</span></div>
    </div>
    <div class="channel-views">
      <!-- <div class="channel-views-name">Просмотры</div> -->
      <div class="channel-views-number24h">Количество постов<br /><span>за 24ч </span> <span>25</span></div>
      <div class="channel-views-number24h">Просмотров на пост<br /><span>за 24ч </span> <span>168 280</span></div>
    </div>
    <button type="button" onClick="goToDashboard(${element.id});$('#closeicon2_added').click();" class="btn" style="background-color: #FFCD24">
      Подробнее
    </button>
    <button type="button" class="btn" style="background-color: #FFCD24">
      Купить рекламу
    </button>`)
}

function reloadRightSidebar(id) {
  let element = allChannels.find(function (element) {
    return element.id == id;
  });
  DrawRightSidebar(element);
}

function ChangeRightSidebar() {
  id = $(this).closest('.channel').find('span')[0].textContent;
  if (GlobalIdChannel !== id) {
    reloadRightSidebar(id);
    if (!sidebar.hasClass('show')) {
      sidebar.addClass('show');
    }
    GlobalIdChannel = id;
    GlobalNameChannel = allChannels.find(function (element) {
      return element.id == id;
    });
    GlobalNameChannel = GlobalNameChannel.title;

    $('[data-ids="CurrentChannelNumber"]').html(id);
    $('[data-ids="CurrentChannelName"]').html(GlobalNameChannel);

  } else {
    sidebar.toggleClass('show');
  }
}

function goToDashboard(id) {
  AllRoleLinks[1].click();
}

function goToChannelsList() {
  AllRoleLinks[0].click();
}

$('.goToChannelsList').on('click', function (e) {
  goToChannelsList();
});

$('[data-ids="goToChannelsList"]').on('click', function (e) {
  goToChannelsList();
  $('#exampleModalLong').modal('toggle');
});

// исправлен глюк, что модальное окно не появлялось у вложенного списка
$('a.dropdown-item[data-toggle="modal"]').on('click', function (e) {
  $('#modalCreateChannel').modal('toggle');
})

// модальное окно с добавлением канала
$('label[for="useTelegramTitle"]').on('click', function (e) {
  $('.use_telegram_title_hidden').toggleClass('d-none');
})
$('label[for="useTelegramDescription"]').on('click', function (e) {
  $('.use_telegram_description_hidden').toggleClass('d-none');
})

// добавление в закладки
$('.ribbon-sign').on('click', function () {
  $(this).closest('.channel').toggleClass('ribboned');
})
// var carouselLength = $('.carousel-item').length - 1;

// // If there is more than one item
// if (carouselLength) {
//   $('.carousel-control-next').removeClass('d-none');
// }

// $('.carousel').on('slide.bs.carousel', function (e) {
//   // First one
//   if (e.to == 0) {
//     $('.carousel-control-prev').addClass('d-none');
//     $('.carousel-control-next').removeClass('d-none');
//   } // Last one
//   else if (e.to == carouselLength) {
//     $('.carousel-control-prev').removeClass('d-none');
//     $('.carousel-control-next').addClass('d-none');
//   } // The rest
//   else {
//     $('.carousel-control-prev').removeClass('d-none');
//     $('.carousel-control-next').removeClass('d-none');
//   }
// });