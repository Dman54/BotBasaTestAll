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
  $(this).closest('.sub-nav').find('>dd:not(.dropdown)').toggleClass('show');
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
let daysSmall = ['Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб'
];

function printDay(now, withYear = false) {
  return '' + days[now.getDay()] + ', ' + ((now.getDate() < 10) ? ('0' + now.getDate()) : (now.getDate())) + '.' +
    ((now.getMonth() < 9) ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1)) + ((withYear) ? ('.' + now
      .getFullYear()) : '');
}

function printDayHTML(now, withYear = false) {
  let weekend = now.getDay() == 0 || now.getDay() == 6;
  weekend = false;
  return '<div class="calendarDate-top" data-toggle="modal" data-target="#exampleModalLong">' +
    '<div class="calendarDate' + ((weekend) ? (' weekendDay') : ('')) + '"><span class="dayName">' + days[now
      .getDay()] + '</span><span class="dayNameSmall">' + daysSmall[now.getDay()] +
    '</span><br /><span class="dayNumber">' + ((now
      .getDate() < 10) ? ('0' + now.getDate()) : (now.getDate())) +
    '</span>.<span class="monthNumber">' +
    ((now.getMonth() < 9) ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1)) + '</span>' + ((withYear) ? ('.' +
      now
        .getFullYear()) : '') + '</div><div class="calendarDate-after">+</div></div>';
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
let curPageSize = 10;
let dataContainer = $('#channelsList .data-container');
$('#channelsList').pagination({
  dataSource: allChannels,
  pageSize: curPageSize,
  className: 'paginationjs-theme-blue paginationjs-big',
  callback: function (data, pagination) {
    dataContainer.html(templateAll(data));
    buttonsToSidebar = $("[data-widget='control-sidebar2']");
    buttonsToSidebar.on('click', function (e) {
      e.preventDefault();
      ChangeRightSidebar(this);
    });
    changeRaitingListeners();
  }
})

// right sidebar open\close and reload content
$("#closeicon2_added, #sidebar-overlay2").on('click', function () {
  sidebar.removeClass('show');
  $('body').removeClass('left-sidebar-open');
});
let sidebar = $("#rightaside");

function DrawRightSidebar(element) {
  sidebar.find('.channel-selected').html(`<div class="id-channel-text d-none">Номер текущего канала: <span id='id-channel-in-rightsidebar'>${element.id}</span></div>
    <div class="channel-top-block">
      <div class="channel-img">
        <img src="tgstat_images/4c56ff4ce4aaf9573aa5dff913df997a.jpg" alt="${element.title}<">
      </div>
      <div class="channel-header">
        <h3 class="channel-name">${element.title}</h3>
        <div class="channel-category">Юмор и развлечения</div>
      </div>
    </div>
    <div class="channel-description">
      ${element.description}
    </div>
    <div class="channel-adprice">
      <div class="channel-adprice-name">
        Стоимость рекламы:
      </div>
      <div class="channel-adprice-content">
        <div class="channel-adprice-number">
          56100&nbsp;<span class="fa fa-rub"></span>
        </div>
        <div class="price-info btn btn-blue">
          <span><i class="far fa-clock"></i> 1/24</span>
        </div>
        <button type="button" class="btn btn-primary">
          <i class="fas fa-shopping-cart"></i> В корзину
        </button>
      </div>
    </div>
    <div class="channel-subscribes">
      <div class="channel-subscribes-name">Подписчики</div>
      <div class="channel-subscribes-content">
        <div class="channel-subscribes-all"><div>Всего </div> <div>${element.members_count}</div></div>
        <div class="channel-subscribes-day"><div>За день </div> <div>-1 600</div></div>
        <div class="channel-subscribes-week"><div>За неделю </div> <div>-9 200</div></div>
        <div class="channel-subscribes-mounth"><div>За месяц </div> <div>-3 800</div></div>
      </div>
    </div>
    <div class="channel-views">
      <div class="channel-views-name">Просмотры</div>
      <div class="channel-views-content">
        <div class="channel-views-day"><div>За день </div> <div>-1 600</div></div>
        <div class="channel-views-week"><div>За неделю </div> <div>-9 200</div></div>
        <div class="channel-views-mounth"><div>За месяц </div> <div>-3 800</div></div>
      </div>
    </div>
    <div class="channel-posts">
      <div class="channel-posts-name">Посты</div>
      <div class="channel-posts-content">
        <div class="channel-posts-day"><div>За день </div> <div>-1 600</div></div>
        <div class="channel-posts-week"><div>За неделю </div> <div>-9 200</div></div>
        <div class="channel-posts-mounth"><div>За месяц </div> <div>-3 800</div></div>
        </div>
    </div>
    <div class="channel-err">
      <div class="channel-err-name">ERR%</div>
      <div class="channel-err-content">
        <div class="channel-err-day"><div>За день </div> <div>67%</div></div>
        <div class="channel-err-week"><div>За неделю </div> <div>54%</div></div>
        <div class="channel-err-mounth"><div>За месяц </div> <div>60%</div></div>
      </div>
    </div>
    <button type="button" onClick="goToDashboard(${element.id});$('#closeicon2_added').click();" class="btn btn-blue w100 br0">
      Подробнее
    </button>`)
}

function reloadRightSidebar(id) {
  let element = allChannels.find(function (element) {
    return element.id == id;
  });
  DrawRightSidebar(element);
}

function ChangeRightSidebar(el) {
  let curChannelEl = $(el).closest('.channel');
  id = curChannelEl.find('span')[0].textContent;
  if (!curChannelEl.hasClass('active')) {
    $(el).closest('.channels_list_body').find('.channel').removeClass('active');
    curChannelEl.addClass('active');
  }
  if (GlobalIdChannel !== id) {
    reloadRightSidebar(id);
    if (!sidebar.hasClass('show')) {
      sidebar.addClass('show');
      $('body').addClass('left-sidebar-open');
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
    $('body').toggleClass('left-sidebar-open');
  }
}

function goToDashboard(id) {
  AllRoleLinks[10].click();
}

function goToChannelsList() {
  AllRoleLinks[11].click();
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

// добавление заметки к каналу
$('.note-sign').on('click', function () {
  if ($(this).closest('.channel').hasClass('noted')) {
    $(this).closest('.channel').next('.channel-info').removeClass('show');
  } else {
    $(this).closest('.channel').next('.channel-info').addClass('show');
  }
  $(this).closest('.channel').toggleClass('noted');
  if (!$(this).closest('.channel').hasClass('ribboned')) {
    $(this).closest('.channel').addClass('ribboned');
  }
})

// кнопки продвижения
function DrawRightSidebarPromotion(element) {
  sidebar.find('.channel-selected').html(`
  <div class="rightSidebarPromotion">
    <div class="rightSidebarPromotion-name">Выберите канал</div>
    <ul class="nav" id="rightSidebarPromotionSelects" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="rightSidebarPromotionSelectsmy" data-toggle="pill"
          href="#rightSidebarPromotionSelectsmyContent" role="tab" aria-controls="custom-content-below-compilations3"
          aria-selected="false">Свои (0)</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="rightSidebarPromotionSelectsother" data-toggle="pill"
          href="#rightSidebarPromotionSelectsotherContent" role="tab" aria-controls="custom-content-below-mutualPR3"
          aria-selected="false">Приглашенные (0)</a>
      </li>
    </ul>
    <div class="tab-content" id="rightSidebarPromotionSelectsContent">
      <div class="tab-pane fade active show" id="rightSidebarPromotionSelectsmyContent" role="tabpanel"
        aria-labelledby="rightSidebarPromotionSelectsmyContent-tab">
        <div class="channels-for-select">
          <div class="channel-for-select">
            <div class="channel-first-part">
              <a href="https://tgstat.ru/channel/AAAAAEDvhYLA-ZoI1386Eg">
                <div>
                  <img alt="Джо Роган в Телеграмме" src="tgstat_images/4c56ff4ce4aaf9573aa5dff913df997a.jpg" class="b-lazy img-thumbnail b-loaded">
                </div>
              </a>
              <div class="channel-block-title">
                <div class="channel-list-title">
                  <b>Академия Джо Рогана</b>
                </div>
                <div>
                  Юмор и развлечения
                </div>
              </div>
            </div>
            <div class="channel-second-part">
              <div class="channels-for-select-vip">VIP</div>
              <span class="custom-control custom-checkbox">
                <input id="useChannel" name="useChannel" type="checkbox" checked="checked" class="custom-control-input">
                <label for="useChannel" class="custom-control-label form-check-label"></label>
              </span>
            </div>
          </div>
          <div class="channel-for-select">
            <div class="channel-first-part">
              <a href="https://tgstat.ru/channel/AAAAAEDvhYLA-ZoI1386Eg">
                <div>
                  <img alt="Джо Роган в Телеграмме" src="tgstat_images/4c56ff4ce4aaf9573aa5dff913df997a.jpg" class="b-lazy img-thumbnail b-loaded">
                </div>
              </a>
              <div class="channel-block-title">
                <div class="channel-list-title">
                  <b>Академия Джо Рогана</b>
                </div>
                <div>
                  Юмор и развлечения
                </div>
              </div>
            </div>
            <div class="channel-second-part">
              <div class="channels-for-select-vip">VIP</div>
              <span class="custom-control custom-checkbox">
                <input id="useChannel2" name="useChannel2" type="checkbox" checked="checked" class="custom-control-input">
                <label for="useChannel2" class="custom-control-label form-check-label"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="rightSidebarPromotionSelectsotherContent" role="tabpanel"
        aria-labelledby="rightSidebarPromotionSelectsotherContent-tab">
        <div class="channels-for-select">
          <div class="channel-for-select">
            <div class="channel-first-part">
              <a href="https://tgstat.ru/channel/AAAAAEDvhYLA-ZoI1386Eg">
                <div>
                  <img alt="Джо Роган в Телеграмме" src="tgstat_images/4c56ff4ce4aaf9573aa5dff913df997a.jpg" class="b-lazy img-thumbnail b-loaded">
                </div>
              </a>
              <div class="channel-block-title">
                <div class="channel-list-title">
                  <b>Академия Джо Рогана</b>
                </div>
                <div>
                  Юмор и развлечения
                </div>
              </div>
            </div>
            <div class="channel-second-part">
              <div class="channels-for-select-vip">VIP</div>
              <span class="custom-control custom-checkbox">
                <input id="useChannel3" name="useChannel3" type="checkbox" checked="checked" class="custom-control-input">
                <label for="useChannel3" class="custom-control-label form-check-label"></label>
              </span>
            </div>
          </div>
          <div class="channel-for-select">
            <div class="channel-first-part">
              <a href="https://tgstat.ru/channel/AAAAAEDvhYLA-ZoI1386Eg">
                <div>
                  <img alt="Джо Роган в Телеграмме" src="tgstat_images/4c56ff4ce4aaf9573aa5dff913df997a.jpg" class="b-lazy img-thumbnail b-loaded">
                </div>
              </a>
              <div class="channel-block-title">
                <div class="channel-list-title">
                  <b>Академия Джо Рогана</b>
                </div>
                <div>
                  Юмор и развлечения
                </div>
              </div>
            </div>
            <div class="channel-second-part">
              <div class="channels-for-select-vip">VIP</div>
              <span class="custom-control custom-checkbox">
                <input id="useChannel4" name="useChannel4" type="checkbox" checked="checked" class="custom-control-input">
                <label for="useChannel4" class="custom-control-label form-check-label"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary">
      Добавить канал
    </button>
  </div>`);
}

function ChangeRightSidebarPromotion() {
  id = $(this).closest('.promotion').find('span')[0].textContent;
  if (GlobalIdChannel !== id) {
    DrawRightSidebarPromotion(id);
    if (!sidebar.hasClass('show')) {
      sidebar.addClass('show');
      $('body').addClass('left-sidebar-open');
    }
    GlobalIdChannel = id;
    // GlobalNameChannel = allChannels.find(function (element) {
    //   return element.id == id;
    // });
    // GlobalNameChannel = GlobalNameChannel.title;

    // $('[data-ids="CurrentChannelNumber"]').html(id);
    // $('[data-ids="CurrentChannelName"]').html(GlobalNameChannel);

  } else {
    sidebar.toggleClass('show');
    $('body').toggleClass('left-sidebar-open');
  }
  $('.channels-for-select-vip').on('click', function (e) {
    $(this).toggleClass('active');
  })
}

let buttonsPromotionToSidebar;
buttonsPromotionToSidebar = $("[data-widget='control-sidebar-promotion']");
buttonsPromotionToSidebar.on('click', ChangeRightSidebarPromotion);

function DrawRightSidebarSelectChannel() {
  sidebar.find('.channel-selected').html(`
  <div class="rightSidebarPromotion">
    <div class="rightSidebarPromotion-name">Выберите канал</div>
    <div class="channels-for-select">
      <div class="channel-for-select">
        <div class="channel-first-part">
          <a href="https://tgstat.ru/channel/AAAAAEDvhYLA-ZoI1386Eg">
            <div>
              <img alt="Джо Роган в Телеграмме" src="tgstat_images/4c56ff4ce4aaf9573aa5dff913df997a.jpg" class="b-lazy img-thumbnail b-loaded">
            </div>
          </a>
          <div class="channel-block-title">
            <div class="channel-list-title">
              <b>Академия Джо Рогана</b>
            </div>
            <div>
              Юмор и развлечения
            </div>
          </div>
        </div>
        <div class="channel-second-part">
          <span class="custom-control custom-checkbox">
            <input id="useChannel" name="useChannel" type="checkbox" checked="checked" class="custom-control-input">
            <label for="useChannel" class="custom-control-label form-check-label"></label>
          </span>
        </div>
      </div>
      <div class="channel-for-select">
        <div class="channel-first-part">
          <a href="https://tgstat.ru/channel/AAAAAEDvhYLA-ZoI1386Eg">
            <div>
              <img alt="Джо Роган в Телеграмме" src="tgstat_images/4c56ff4ce4aaf9573aa5dff913df997a.jpg" class="b-lazy img-thumbnail b-loaded">
            </div>
          </a>
          <div class="channel-block-title">
            <div class="channel-list-title">
              <b>Академия Джо Рогана</b>
            </div>
            <div>
              Юмор и развлечения
            </div>
          </div>
        </div>
        <div class="channel-second-part">
          <span class="custom-control custom-checkbox">
            <input id="useChannel2" name="useChannel2" type="checkbox" checked="checked" class="custom-control-input">
            <label for="useChannel2" class="custom-control-label form-check-label"></label>
          </span>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary">
      Добавить канал
    </button>
  </div>`);
}

function ChangeRightSidebarSelectChannel() {
  DrawRightSidebarSelectChannel();
  sidebar.toggleClass('show');
  $('body').toggleClass('left-sidebar-open');
}

let buttonsSelectChannelToSidebar;
buttonsSelectChannelToSidebar = $("[data-widget='control-sidebar-select-channel']");
buttonsSelectChannelToSidebar.on('click', ChangeRightSidebarSelectChannel);

// изменение количества записей на странице
$('#PagesCounter').on('change', function (e) {
  if (curPageSize == +$('#PagesCounter').val()) return;
  curPageSize = +$('#PagesCounter').val();
  dataContainer = $('#channelsList .data-container');
  $('#channelsList').pagination({
    dataSource: allChannels,
    pageSize: curPageSize,
    className: 'paginationjs-theme-blue paginationjs-big',
    callback: function (data, pagination) {
      dataContainer.html(templateAll(data));
      buttonsToSidebar = $("[data-widget='control-sidebar2']");
      buttonsToSidebar.on('click', function (e) {
        e.preventDefault();
        ChangeRightSidebar(this);
      });
      changeRaitingListeners();
    }
  })
});
// $('#ChangePagesCounter').on('click', function (e) {
// })

let postsCarouselDates = $('.posts-carousel-dates>span');
$('#carouselExampleIndicators3').on('slide.bs.carousel', function (e) {
  // console.log(e.to);
  postsCarouselDates.removeClass('active');
  $(postsCarouselDates[e.to]).addClass('active');
})

$('.publication-times-delete-check input[type="checkbox"]').on('change', function (e) {
  $('.publication-times-delete-timeblock').toggleClass('offnut');
});

$(function () {
  // $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').each(function () {
    $(this).tooltip({
      container: $(this)
    });
  });
  var selectTabs = $('.select-tabs');
  selectTabs.on('change', function (e) {
    $(this).next().find('li a').eq($(this).val()).tab('show');
    // $(this).parent().find('.nav-tabs li a').eq($(this).val()).tab('show');
  });
});

$(function () {
  var $chat_messages = $('.chat-messages');
  var $content = $('.content-wrapper');
  var $window = $(window).on('resize', function () {
    // $chat_messages.height(parseInt($content.css('min-height')) - 130 + 'px');
    $chat_messages.css('height', parseInt($content.css('min-height')) - 130 + 'px');
  }).trigger('resize');

});

$('.chat-dialoges-item').on('click', function (e) {
  if ($(window).width() <= 535) {
    $(this).parent().toggleClass('translateX-100');
    $(this).closest('.chat-dialoges-wrapper').find('.chat-messages').toggleClass('translateX-100');
  }
});

$('.back-to-channels').on('click', function (e) {
  $(this).closest('.chat-messages').toggleClass('translateX-100');
  $(this).closest('.chat-dialoges-wrapper').find('.chat-dialoges').toggleClass('translateX-100');
});

let before = {
  short_description: "",
  href1: "",
  href2: "",
  channel_language: "",
  channel_category: "",
  channel_adprice_number: ""
};
$('.editChannel').on('click', function (e) {
  let curcarouselitem = $(this).closest('.tab-pane').find('.dashboard-carousel .carousel-item.active');
  if ($(this).hasClass('editing')) {
    if (curcarouselitem.find('.short-description>input').val().length > 30) {
      alert('слишком длинное название, должно быть меньше 31 символа!');
      return;
    }
    curcarouselitem.find('.short-description>span').html(curcarouselitem.find('.short-description>input').val());
    curcarouselitem.find('.goToChannel').attr('href', curcarouselitem.find('.goToChannel input').val());
    curcarouselitem.find('.goToChannel').attr('href', curcarouselitem.find('.goToChannel input').val());
    curcarouselitem.find('.channel-language .editable>span').html(curcarouselitem.find('.channel-language .editable>select').val());
    curcarouselitem.find('.channel-category .editable>span').html(curcarouselitem.find('.channel-category .editable>select').val());
    curcarouselitem.find('.channel-adprice-number .editable>span').html(curcarouselitem.find('.channel-adprice-number .editable>input').val());
    curcarouselitem.find('a.editable').attr("href", before.href1);
    // curcarouselitem.find('a.editable').removeAttr("onclick");
  } else {
    before.short_description = curcarouselitem.find('.short-description>span').html();
    before.href1 = curcarouselitem.find('.goToChannel').attr('href');
    before.href2 = curcarouselitem.find('.goToChannel').attr('href');
    before.channel_language = curcarouselitem.find('.channel-language .editable>span').html();
    before.channel_category = curcarouselitem.find('.channel-category .editable>span').html();
    before.channel_adprice_number = curcarouselitem.find('.channel-adprice-number .editable>span').html();
    curcarouselitem.find('a.editable').removeAttr("href");
    // curcarouselitem.find('a.editable').attr('onclick', 'return false;');
  }
  curcarouselitem.find('.editable').toggleClass('editing');
  // if ($(this).hasClass('editing')) {
  //   curcarouselitem.find('.short-description').attr('contenteditable', 'false').toggleClass('editable-el');
  //   curcarouselitem.find('.goToChannel').attr('contenteditable', 'false').toggleClass('editable-el');
  //   curcarouselitem.find('.channel-language>*:last-child').attr('contenteditable', 'false').toggleClass('editable-el');
  //   curcarouselitem.find('.channel-category>*:last-child').attr('contenteditable', 'false').toggleClass('editable-el');
  //   curcarouselitem.find('.channel-adprice-number').attr('contenteditable', 'false').toggleClass('editable-el');
  // } else {
  //   curcarouselitem.find('.short-description').attr('contenteditable', 'true').toggleClass('editable-el');
  //   curcarouselitem.find('.goToChannel').attr('contenteditable', 'true').toggleClass('editable-el');
  //   curcarouselitem.find('.channel-language>*:last-child').attr('contenteditable', 'true').toggleClass('editable-el');
  //   curcarouselitem.find('.channel-category>*:last-child').attr('contenteditable', 'true').toggleClass('editable-el');
  //   curcarouselitem.find('.channel-adprice-number').attr('contenteditable', 'true').toggleClass('editable-el');
  // }
  $(this).toggleClass('editing');
});