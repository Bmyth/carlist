$(function(){
    $('.bd-page').on('click', ".bd-item", showDetailPanel);

    $(".console-panel #add").click(showCreatePanel);
    $(".console-panel #list").click(toListViewMode);
    $(".detail-panel #back").click(hideDetailPanel);
    $('.detail-panel #edit').click(switchToEditMode);
    $('.console-panel #search').click(toggleSearchRow);
    $(".detail-panel #save").click(submitBD);
    $(".detail-panel #delete").click(deleteBD);

    $(".console-panel .row-2 .searchKeyBtn").click(toggleSearchKeyList);
    $(".console-panel .row-2 .dropdown-menu li").click(updateSearchKey);
    $(".console-panel .row-2 .searchValueInput").focus(closeSearchKeyList);

    $(".console-panel .startSearch").click(searchBD);

    $(".detail-panel .master-check-trigger").click(masterCheck);
    $(".detail-panel .master-uncheck-trigger").click(masterUncheck);
    $(".detail-panel .worker-check-trigger").click(workerCheck);
    $(".detail-panel .worker-uncheck-trigger").click(workerUncheck);

    $(".warden-page .opt-panel #user-add").click(toggleUserAddForm);
    $(".warden-page  #user-delete").click(deleteUser);
    $(".warden-page  #user-update").click(updateUser);

    $(".sponser").click(callSponsee);
    $(".sponsee span:not('.to-setting')").click(replySponser);

    $(".bottom-opt button").click(updateBottomInfoWithNewDays);

    $(".user-opt").click(toggleUserOpt);
    $(".user-opt-list .setting").click(toSettingView);
    $(".user-opt-list .logout").click(logout);

    $(".add-master").click(addMaster);
    $(".add-worker").click(addWorker);
    $(".delete-master").click(deleteMaster);
    $(".delete-worker").click(deleteWorker);

    $(".to-setting").click(toSettingView);
    $(".setting-page .back").click(toConsoleView);

    updateBottomInfo();
});

function showDetailPanel(){
    var id = $(this).attr('bdIdx');
    $('.bd-page').fadeOut(function(){
        $(".main-bottom-info").text('获取数据');
        $.get('getBD',{bd_id:id}, function(r){
            renderDetail(r);
            $('.detail-panel').addClass('detail-mode').fadeIn();
            $(".main-bottom-info").text('');
        })
    });

    $(".bottom-panel").fadeOut();

    function renderDetail(response){
        var dp = $('.detail-panel');
        dp.attr('bdID', response.id);
        dp.find('li#bd-info #applicantNameText').text('投保人: ' + (response.applicantName || '未填'));
        dp.find('li#bd-info #plateText').text('车牌号：' + (response.plate || '未填'));
        dp.find('li#bd-info #numberText').text('保单号：' + (response.number  || '未填'));
        dp.find('li#bd-info #bdTypeText').text('种类：' + (response.bdType  || '未填'));
        dp.find('li#master #masterText').text('保险公司：' + (response.master  || '未填'));
        dp.find('li#master .checked').removeClass('checked');
        dp.find('li#worker .checked').removeClass('checked');
        response.masterChecked ? dp.find('li#master .master-check-trigger').addClass('checked') : dp.find('li#master .master-uncheck-trigger').addClass('checked');
        dp.find('li#worker #workerText').text('办理人：' + (response.worker  || '未填'));
        response.workerChecked ? dp.find('li#worker .worker-check-trigger').addClass('checked') : dp.find('li#worker .worker-uncheck-trigger').addClass('checked');
        dp.find('li#fee-a #feeAText').text('交强险金额：' + (response.feeA  || '未填'));
        dp.find('li#fee-a #feeAoutText').text('支付率：' + (response.rateAout  || '未填'));
        dp.find('li#fee-a #feeAinText').text('收入率：' + (response.rateAin  || '未填'));
        dp.find('li#fee-b #feeBText').text('商业险金额：' + (response.feeB  || '未填'));
        dp.find('li#fee-b #feeBoutText').text('支付率：' + (response.rateBout  || '未填'));
        dp.find('li#fee-b #feeBinText').text('收入率：' + (response.rateBin  || '未填'));
        dp.find('li#date #fillDateText').text('办理日期：' + (response.fillDate  || '未填'));
        if(response.startDate){
            dp.find('li#date #startDateText').text('生效日期：' + response.startDate);
        }
        if(response.endDate){
            dp.find('li#date #endDateText').text('到期日期：' + response.endDate);
        }
        if(response.otherInfo){
            dp.find('li#otherInfo #otherInfoText').text(response.otherInfo);
        }

        dp.find('li#bd-info #applicantNameInput').val(response.applicantName);
        dp.find('li#bd-info #plate').val(response.plate);
        dp.find('li#bd-info #numberInput').val(response.number);
        dp.find('.sp-type').text(response.bdType || '未填');
        dp.find('li#bd-info #bdTypeInput').val(response.bdType);
        dp.find('li#master #masterInput').val(response.master);
        dp.find('li#master #masterCheckedInput').val(response.masterChecked);
        dp.find('li#master .sp-master').text(response.master);
        dp.find('li#worker #workerInput').val(response.worker);
        dp.find('li#worker #workerCheckedInput').val(response.workerChecked);
        dp.find('li#worker .sp-worker').text(response.worker);
        dp.find('li#fee-a #feeAInput').val(response.feeA);
        dp.find('li#fee-a #feeAoutInput').val(response.rateAout);
        dp.find('li#fee-a #feeAinInput').val(response.rateAin);
        dp.find('li#fee-b #feeBInput').val(response.feeB);
        dp.find('li#fee-b #feeBoutInput').val(response.rateBout);
        dp.find('li#fee-b #feeBinInput').val(response.rateBin);
        dp.find('li#date #fillDateInput').val(response.fillDate);
        dp.find('li#date #endDateInput').val(response.endDate);
        dp.find('li#date .endDateWrapper .endDateYear').text(getYear(response.endDate));
        dp.find('li#date .endDateWrapper .endDateMonth').text(getMonth(response.endDate));
        dp.find('li#date .endDateWrapper .endDateDay').text(getDay(response.endDate));
        if(response.otherInfo){
            dp.find('li#otherInfo #otherInfoInput').val(response.otherInfo);
        }
    }
}

function hideDetailPanel(){
    $('.detail-panel').fadeOut(function(){
        $('.bd-page').fadeIn();
        $('.detail-panel').removeClass('detail-mode edit-mode update-mode');
    });
    $('.console-panel .nav-tabs li').removeClass('active');
    $('.console-panel .nav-tabs li#list').addClass('active');
    $(".bottom-panel").show();
}

function showCreatePanel(){
    $('.bd-page').fadeOut(function(){
        $(".detail-panel").find('input.need-clean').val("");
        fillWithCookie();
        $(".detail-panel").removeClass('detail-mode').addClass('edit-mode').fadeIn(function(){

        });
    });
    $('.console-panel .row-2').fadeOut(function(){
        $('.nav-padding').css('height',0);
    });

    $(".bottom-panel").fadeOut();

    $('.console-panel .nav-tabs li').removeClass('active');
    $('.console-panel .nav-tabs li#add').addClass('active');
}

function toListViewMode(){
  $(".bottom-panel").fadeIn();
  showBDList();
  hideSearchPanel();
}

function showBDList(){
    if($('.detail-panel').css('display') === 'block'){
        hideDetailPanel();
    }
}

function switchToEditMode(){
    $('.detail-panel').removeClass('detail-mode').addClass('update-mode');

    $('.console-panel .row-2').hide();
    $('.nav-padding').css('height', 0);

    $('.console-panel .nav-tabs li').removeClass('active');
    $('.console-panel .nav-tabs li#add').addClass('active');
}

function toggleSearchRow(){
    if($(".console-panel .nav-tabs li#search").hasClass('active')){
        $(".bottom-panel").fadeIn();
        hideSearchPanel();
    }else{
        showBDList();
        showSearchPanel();
        $(".bottom-panel").fadeOut();
    }
}

function showSearchPanel(){
    $(".bd-page").addClass("search-mod");
    $('.console-panel .row-2').show();
    $('.nav-padding').css('height',45);

    $('.console-panel .nav-tabs li').removeClass('active');
    $('.console-panel .nav-tabs li#search').addClass('active');
}

function hideSearchPanel(){
    $(".bd-page").removeClass("search-mod");
    $('.console-panel .row-2').hide();
    $('.nav-padding').css('height',0);

    $('.console-panel .nav-tabs li').removeClass('active');
    $('.console-panel .nav-tabs li#list').addClass('active');

    $('.searchValueInput').val('');
    $(".bd-list .bd-item").removeClass('hide');
    $(".bd-list .date-item").show();
    closeSearchKeyList();
}

function submitBD(){
    if($(this).hasClass('locked'))
        return;

    var s = $(this).addClass('locked');

    $(".detail-panel input#bdTypeInput").val($(".sp-type").text());
    $(".detail-panel #date input#endDateInput").val($(".sp-endDateYear").text() + "-" + $(".sp-endDateMonth").text() + "-" + $(".sp-endDateDay").text());
    $(".detail-panel input#masterInput").val($(".sp-master").text());
    $(".detail-panel input#workerInput").val($(".sp-worker").text());

    var postVal = $('.detail-panel form').serialize();
    if($('.detail-panel').hasClass('update-mode')){
        var id = $(".detail-panel").attr('bdid');
        $(".main-bottom-info").text('提交修改');
        $.post("updateBD/" + id, postVal, function(r){
            s.removeClass('locked');
            renderBD(r, id);
        });
    }else{
        $(".main-bottom-info").text('上传保单');
        $.post("addBD", postVal, function(r){
            s.removeClass('locked');
            renderBD(r);
        });
    }

    updateCookie();

    function renderBD(response, bdid){
        var bdElement;
        if(bdid){
            bdElement = getBDItem(bdid);
        }else{
            var fd = response.fillDate;
            var dateLi = $('.bd-page li.date-item:first');

            if(fd === dateLi.find('p').text()){
                bdElement = $('.bd-template').find('.bd-item').clone().insertAfter(dateLi);
            }else{
                var di = $('.bd-template').find('.date-item').clone().insertBefore(dateLi);
                di.find('p').text(fd);
                bdElement = $('.bd-template').find('.bd-item').clone().insertBefore(dateLi);
            }

        }
        bdElement.attr({bdidx:response.id, number:response.number, applicantName:response.applicantName, master:response.master, worker:response.worker, masterCheck: (response.masterChecked ? 'y' : 'n'), workercheck: (response.workerChecked ? 'y' : 'n'), enddate: response.endDate, filldate: response.fillDate, feea : response.feeA, feeb : response.feeB, rateain : response.rateAin, rateaout : response.rateAout, ratebin : response.rateBin, rateBout : response.rateBout, plate : response.plate});
        bdElement.find('.bd-name .applicantNameText').text(response.applicantName);
        bdElement.find('.bd-name .numberText').text(response.number);

        bdElement.find('.bd-fee .feeAText').text(response.feeA || '');
        bdElement.find('.bd-fee .feeBText').text(response.feeB || '');

        var checkStatus = response.workerChecked ? "checked" : "not-checked";
        bdElement.find('.bd-check #info-worker').removeClass("checked", "not-checked").addClass(checkStatus).text(response.worker);
        checkStatus = response.masterChecked ? "checked" : "not-checked";
        bdElement.find('.bd-check #info-master').removeClass("checked", "not-checked").addClass(checkStatus).text(response.master);

        $(".main-bottom-info").text('');

        updateBottomInfo();
        hideDetailPanel();
    }
}

function deleteBD(){
    var id = $(".detail-panel").attr('bdid');
    $.post("deleteBD", {bd_id:id}, function(r){
        if(r.success){
            var s = 'li[bdidx=' + id + ']';
            $('.bd-page').find(s).remove();
            updateBottomInfo();
            hideDetailPanel();
        }
    })
}

function toggleSearchKeyList(){
    if($(this).hasClass('on')){
        $(".console-panel .row-2 .dropdown-menu").hide();
        $(this).removeClass('on');
    }else{
        $(".console-panel .row-2 .dropdown-menu").show();
        $(this).addClass('on');
    }
}

function closeSearchKeyList(){
    $(".console-panel .row-2 .dropdown-menu").hide();
    $(this).removeClass('on');
}

function updateSearchKey(){
    var key = $(this).attr('key');
    var keyName = $(this).find('a').text();
    $(".searchKeyBtn").removeClass('on').attr('key', key).find(".searchKeyText").text(keyName);
    $(".console-panel .row-2 .dropdown-menu").hide();

    if(key === 'masterUncheck'){
        filterMasterUncheckBD();
        trimDateItem();
    }

    if(key === 'workerUncheck'){
        filterWorkerUncheckBD();
        trimDateItem();
    }

    if(key === 'endDate'){
        filterEndDateBD();
        trimDateItem();
    }
    return false;
}

function searchBD(){
    closeSearchKeyList();
    var key = $('.searchKeyBtn').attr('key');
    var value = $('.searchValueInput').val();

    if(key === 'masterUncheck'){
        filterMasterUncheckBD();
    }else if(key === 'workerUncheck'){
        filterWorkerUncheckBD();
    }else if(key === 'endDate'){
        filterEndDateBD();
    }else{
        if(value !== ""){
            filterBDList(key, value);
        }else{
            sortBDList(key);
        }
    }

    trimDateItem();
}

function filterBDList(key, value){
    $(".bd-list .bd-item").each(function(){
        if($(this).attr(key) !== value){
            $(this).addClass('hide');
        }else{
            $(this).removeClass('hide');
        }
    })
}

function filterMasterUncheckBD(){
    $(".bd-list .bd-item").each(function(){
        if($(this).attr('mastercheck') === 'y'){
            $(this).addClass('hide');
        }else{
            $(this).removeClass('hide');
        }
    })
}

function filterWorkerUncheckBD(){
    $(".bd-list .bd-item").each(function(){
        if($(this).attr('workercheck') === 'y'){
            $(this).addClass('hide');
        }else{
            $(this).removeClass('hide');
        }
    })
}

function filterEndDateBD(){
    var month = new Date().getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var s = new Date().getFullYear() + '-' + month;
    $(".bd-list .bd-item").each(function(){
        if($(this).attr('enddate').substring(0,7) !== s){
            $(this).addClass('hide');
        }else{
            $(this).removeClass('hide');
        }
    })
}

function sortBDList(key){
    $(".bd-list .bd-item").removeClass('hide');
}

function trimDateItem(){
    $(".bd-list .date-item").show();
    var i;
    var shouldHide = true;
    $(".bd-list .list-group-item:not('.hide')").each(function(){
        if($(this).hasClass('date-item')){
            if(i && shouldHide){
                i.hide();
            }
            i = $(this);
            shouldHide = true;
        }else{
            shouldHide = false;
        }
    })
    if(i && shouldHide){
        i.hide();
    }
}

function masterCheck(){
    var bid = $('.detail-panel').attr('bdid');
    $.post("masterCheck", {bd_id:bid}, function(r){
        if(r.success){
            $(".detail-panel .master-check-trigger").addClass('checked');
            $(".detail-panel .master-uncheck-trigger").removeClass('checked');
            getBDItem(bid).attr('mastercheck', 'y').find('#info-master').removeClass('not-checked');
            updateBottomInfo();
        }
    })
}

function masterUncheck(){
    var bid = $('.detail-panel').attr('bdid');
    $.post("masterUncheck", {bd_id:bid}, function(r){
        if(r.success){
            $(".detail-panel .master-check-trigger").removeClass('checked');
            $(".detail-panel .master-uncheck-trigger").addClass('checked');
            getBDItem(bid).attr('mastercheck', 'n').find('#info-master').addClass('not-checked');
            updateBottomInfo();
        }
    })
}

function workerCheck(){
    var bid = $('.detail-panel').attr('bdid');
    $.post("workerCheck", {bd_id:bid}, function(r){
        if(r.success){
            $(".detail-panel .worker-check-trigger").addClass('checked');
            $(".detail-panel .worker-uncheck-trigger").removeClass('checked');
            getBDItem(bid).attr('workercheck', 'y').find('#info-worker').removeClass('not-checked');
            updateBottomInfo();
        }
    })
}

function workerUncheck(){
    var bid = $('.detail-panel').attr('bdid');
    $.post("workerUncheck", {bd_id:bid}, function(r){
        if(r.success){
            $(".detail-panel .worker-check-trigger").removeClass('checked');
            $(".detail-panel .worker-uncheck-trigger").addClass('checked');
            getBDItem(bid).attr('workercheck', 'n').find('#info-worker').addClass('not-checked');
            updateBottomInfo();
        }
    })
}

function getBDItem(bid){
    var bd = ".bd-page .bd-item[bdidx=" + bid + "]";
    return $(bd);
}

function logout(){
    self.location='/logout';
}

function toggleUserAddForm(){
    var f = $(".warden-page .user-add-form");
    if(f.hasClass('on')){
        f.hide().removeClass('on');
    }else{
        f.show().addClass('on');
    }
}

function deleteUser(){
    var uid = $(this).attr('uid');
    $.post("deleteUser", {uid:uid}, function(){
        self.location='/warden';
    })
}

function updateUser(){
    var uid = $(this).attr('uid');
    var i = $(this).parents('.list-group-item');

    var name = i.find('.name').text();
    var pwd = i.find('.password').text();
    var expiryDate = i.find('.expiryDate').text();
    var info1 = i.find(".info1").text();
    var info2 = i.find(".info2").text();
    var info3 = i.find(".info3").text();
    var info4 = i.find(".info4").text();

    $(".user-update-form").show();
    var f = $("#user-update-form");
    f.find("#uid").val(uid);
    f.find("#name").val(name);
    f.find("#password").val(pwd);
    f.find("#info1").val(info1);
    f.find("#info2").val(info2);
    f.find("#info3").val(info3);
    f.find("#info4").val(info4);
    f.find("#expiryDate").val(expiryDate);
}

function callSponsee(){
    if($(this).hasClass('exp')){
        $(this).removeClass('exp');
        var code = $(this).attr('code');
        $(".sponsee[code='" + code + "']").hide();
    }else{
        $(this).addClass('exp');
        $(".sponsee").hide();
        var code = $(this).attr('code');
        $(".sponsee[code='" + code + "']").show();
    }
}

function replySponser(){
    var v = $(this).text();
    var code = $(this).parent('.sponsee').attr('code');
    $(".sponser[code='" +code +"']").text(v).removeClass('exp');
    $(".sponsee").hide();

    if(code === 'type'){
        $.cookie('cl_type', v);
        fillWithCookie();
    }
}

function getYear(date){
    if(typeof date === "string" && date.length === 10){
        return date.substring(0,4);
    }
    return "?";
}

function getMonth(date){
    if(typeof date === "string" && date.length === 10){
        return date.substring(5,7);
    }
    return "?";
}

function getDay(date){
    if(typeof date === "string" && date.length === 10){
        return date.substring(8,10);
    }
    return "?";
}

function updateBottomInfoWithNewDays(){
    $(".bottom-panel button.idx").removeClass("idx").removeClass("btn-default");
    $(this).addClass("idx").addClass("btn-default");
    updateBottomInfo();
}

function updateBottomInfo(){
    var days = $(".bottom-panel button.idx").text() - "0";
    var vin = 0;
    var vout = 0;
    var vnin = 0;
    var vnout = 0;
    $(".bd-list .bd-item").each(function(){
        if(isInRange($(this).attr('fillDate'), days)){
            $(this).addClass("in-range");
            var ssin = $(this).attr('feea') * $(this).attr('rateain') + $(this).attr('feeb') * $(this).attr('ratebin');
            var ssout = $(this).attr('feea') * $(this).attr('rateaout') + $(this).attr('feeb') * $(this).attr('ratebout');

            if($(this).attr('mastercheck') === 'y'){
                vin += ssin;
            }else{
                vnin += ssin;
            }
            if($(this).attr('workercheck') === 'y'){
                vout += ssout;
            }else{
                vnout += ssout;
            }
        }else{
            $(this).removeClass("in-range");
        }
    });

    function isInRange(fillDate, days){
        var fillYear = getYear(fillDate) - "0";
        var fillMonth = getMonth(fillDate) - "0";
        var fillDay = getDay(fillDate) - "0";
        var d = new Date();
        var thisYear = d.getFullYear();
        var thisMonth = d.getMonth() + 1;
        var thisDay = d.getDate();
        var inRange = false;

        if(fillYear != thisYear)
            return false;

        if(days === 1){
            inRange = (fillMonth === thisMonth && fillDay === thisDay);
        }else if(days === 15){
            inRange = (fillMonth === thisMonth && ((fillDay <= 15 && thisDay <= 15) || (fillDay > 15 && thisDay > 15)));
        }else if(days === 30){
            inRange = (fillMonth === thisMonth);
        }
        return inRange;
    }

    $(".bif-in").text("收入:" + vin.toFixed(2));
    $(".bif-out").text("支出:" + vout.toFixed(2));
    $(".bif-n-in").text("未入:" + vnin.toFixed(2));
    $(".bif-n-out").text("未出:" + vnout.toFixed(2));
}

function toggleUserOpt(){
    if($(this).hasClass('on')){
        $(".user-opt-list").hide();
        $(this).removeClass('on');
    }else{
        $(".user-opt-list").show();
        $(this).addClass('on');
    }
}

function toSettingView(){
    self.location='/setting';
}

function toConsoleView(){
    self.location='/console';
}

var masterItem =  '<div class="row master-item"><p class="col-xs-4"></p><p class="btn col-xs-8 delete-master">X</p></div>';
var workerItem =  '<div class="row worker-item"><p class="col-xs-4"></p><p class="btn col-xs-8 delete-worker">X</p></div>';

function addMaster(){
    if($(this).hasClass('exp')){
        var v = $('.master-add-input input').val();
        if(v !== ''){
            $.post("addMaster", {name:v}, function(r){
                if(r.success){
                    var i = $(masterItem).attr('mid', r.mid).insertAfter($('.master-anchor'));
                    i.find('.delete-master').attr('mid', r.mid);
                    i.find('.col-xs-4').text(v);
                }
            })
        }
        $(".master-add-input").hide().find('input').val('');
        $(this).removeClass('exp');
    }else{
        $(".master-add-input").show().find('input').focus();
        $(this).addClass('exp');
    }
}

function addWorker(){
    if($(this).hasClass('exp')){
        var v = $('.worker-add-input input').val();
        if(v !== ''){
            $.post("addWorker", {name:v}, function(r){
                if(r.success){
                    var i = $(workerItem).attr('wid', r.wid).insertAfter($('.worker-anchor'));
                    i.find('.delete-worker').attr('wid', r.wid);
                    i.find('.col-xs-4').text(v);
                }
            })
        }
        $(".worker-add-input").hide().find('input').val('');
        $(this).removeClass('exp');
    }else{
        $(".worker-add-input").show().find('input').focus();
        $(this).addClass('exp');
    }
}

function deleteMaster(){
    var mid = $(this).attr('mid');
    $.post("deleteMaster", {mid: mid}, function(r){
        if(r.success){
            $('.setting-page').find('.master-item[mid="' + mid + '"]').remove();
        }
    })
}

function deleteWorker(){
    var wid = $(this).attr('wid');
    $.post("deleteWorker", {wid: wid}, function(r){
        if(r.success){
            $('.setting-page').find('.worker-item[wid="' + wid + '"]').remove();
        }
    })
}

function updateCookie(){
    var type = $("input#bdTypeInput").val();
    var rate_a_in = $("input#feeAinInput").val();
    var rate_a_out = $("input#feeAoutInput").val();
    var rate_b_in = $("input#feeBinInput").val();
    var rate_b_out = $("input#feeBoutInput").val();

    $.cookie('cl_type', type);
    if(type === '营运'){
        $.cookie('cl_y_rate_a_in', rate_a_in);
        $.cookie('cl_y_rate_a_out', rate_a_out);
        $.cookie('cl_y_rate_b_in', rate_b_in);
        $.cookie('cl_y_rate_b_out', rate_a_out);
    }
    if(type === '非营运'){
        $.cookie('cl_f_rate_a_in', rate_a_in);
        $.cookie('cl_f_rate_a_out', rate_a_out);
        $.cookie('cl_f_rate_b_in', rate_b_in);
        $.cookie('cl_f_rate_b_out', rate_b_out);
    }
}

function fillWithCookie(){
    var type = $.cookie('cl_type');
    if(type){
        $('.sp-type').text(type);
        $('li#bd-info #bdTypeInput').val(type);
        if(type === '营运'){
            $("input#feeAinInput").val($.cookie('cl_y_rate_a_in'));
            $("input#feeAoutInput").val($.cookie('cl_y_rate_a_out'));
            $("input#feeBinInput").val($.cookie('cl_y_rate_b_in'));
            $("input#feeBoutInput").val($.cookie('cl_y_rate_b_out'));
        }
        if(type === '非营运'){
            $("input#feeAinInput").val($.cookie('cl_f_rate_a_in'));
            $("input#feeAoutInput").val($.cookie('cl_f_rate_a_out'));
            $("input#feeBinInput").val($.cookie('cl_f_rate_b_in'));
            $("input#feeBoutInput").val($.cookie('cl_f_rate_b_out'));
        }
    }
}