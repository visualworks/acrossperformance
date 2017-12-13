!function(window){"use strict";"undefined"==typeof MkTracker?window.MkTracker=function(){var MkTracker={},MKTrackerTimeout=0;return MkTracker.clickCounter=function(elements){if("object"!=typeof elements||MkTracker.isEmpty(elements))return console.log("Argument passed is not object"),!1;for(var elementsId in elements)for(var elementsOject=document.querySelectorAll(elementsId),counter=0;counter<elementsOject.length;counter++)elementsOject[counter].setAttribute("data-mktrackername",elements[elementsId].storageTitle),elementsOject[counter].setAttribute("data-mkcollecttype",elements[elementsId].collectType),elementsOject[counter].setAttribute("data-mkcollect",elements[elementsId].collect);return MkTracker.addListener("click",document,MkTracker.clickCounter.TriggerAction),!0},MkTracker.clickCounter.TriggerAction=function(event){for(var targetElement=event.target||event.srcElement,totalClicksArea=document.querySelectorAll('[data-mkcollect="total-clicks"]'),i=0;i<totalClicksArea.length;i++)MkTracker.childOf(targetElement,totalClicksArea[i])&&MkTracker.storage("total-clicks",totalClicksArea[i].dataset.mktrackername,1,totalClicksArea[i].dataset.mkcollecttype);return targetElement.hasAttribute("data-mktrackername")&&targetElement.hasAttribute("data-mkcollecttype")&&targetElement.hasAttribute("data-mkcollect")&&"click"==targetElement.dataset.mkcollect&&MkTracker.storage("click",targetElement.dataset.mktrackername,1,targetElement.dataset.mkcollecttype),event.stopPropagation(),!0},MkTracker.loadTimeCalc=function(elements){if("object"!=typeof elements||MkTracker.isEmpty(elements))return console.log("Argument passed is not object"),!1;for(var elementsId in elements)for(var elementsOject=document.querySelectorAll(elementsId),counter=0;counter<elementsOject.length;counter++)elementsOject[counter].setAttribute("data-mktrackername",elements[elementsId].storageTitle),elementsOject[counter].setAttribute("data-mkcollecttype",elements[elementsId].collectType),elementsOject[counter].setAttribute("data-mkcollect",elements[elementsId].collect);return MkTracker.addListener("load",window,MkTracker.loadTimeCalc.TriggerAction),!0},MkTracker.loadTimeCalc.TriggerAction=function(event){for(var elementsOject=document.querySelectorAll('[data-mkcollect="loadtime"]'),counter=0;counter<elementsOject.length;counter++){var loadTime=window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;MkTracker.storage("loadtime",elementsOject[counter].dataset.mktrackername,loadTime,elementsOject[counter].dataset.mkcollecttype)}return!0},MkTracker.textCounter=function(elements){if("object"!=typeof elements||MkTracker.isEmpty(elements))return console.log("Argument passed is not object"),!1;for(var elementsId in elements)for(var elementsOject=document.querySelectorAll(elementsId),counter=0;counter<elementsOject.length;counter++)elementsOject[counter].setAttribute("data-mktrackername",elements[elementsId].storageTitle),elementsOject[counter].setAttribute("data-mkcollecttype",elements[elementsId].collectType),elementsOject[counter].setAttribute("data-mkcollect",elements[elementsId].collect),"SELECT"==elementsOject[counter].tagName?MkTracker.addListener("change",document,MkTracker.textCounter.TriggerAction):MkTracker.addListener("keyup",document,MkTracker.textCounter.TriggerAction);return!0},MkTracker.textCounter.TriggerAction=function(event){var targetElement=event.target||event.srcElement;if(targetElement.hasAttribute("data-mktrackername")&&targetElement.hasAttribute("data-mkcollecttype")&&targetElement.hasAttribute("data-mkcollect")&&"text-values"==targetElement.dataset.mkcollect)if("SELECT"==targetElement.tagName)MkTracker.storage("text-values",targetElement.dataset.mktrackername,[targetElement.options[targetElement.selectedIndex].text,1],targetElement.dataset.mkcollecttype);else{MKTrackerTimeout&&clearTimeout(MKTrackerTimeout);var targetElementValue=MkTracker.trim(targetElement.value);""!=targetElementValue&&(MKTrackerTimeout=setTimeout(function(){MkTracker.storage("text-values",targetElement.dataset.mktrackername,[targetElementValue,1],targetElement.dataset.mkcollecttype)},500))}return event.stopPropagation(),!0},MkTracker.storage=function(dataType,sectionName,value,collectType){var localStorageData=MkTracker.storage.loadData();if(null!=localStorageData&&void 0!=localStorageData||(localStorageData={},localStorageData[dataType]={},localStorageData[dataType][sectionName]={}),MkTracker.isEmpty(localStorageData[dataType])&&(localStorageData[dataType]={}),MkTracker.isEmpty(localStorageData[dataType][sectionName])&&"mixed"!==collectType)localStorageData[dataType][sectionName]={value:value,collectType:collectType};else if("mixed"===collectType){MkTracker.isEmpty(localStorageData[dataType][sectionName])&&(localStorageData[dataType][sectionName]={value:[],collectType:collectType});var storedValue=localStorageData[dataType][sectionName].value;if(storedValue.filter(function(e){return e.text==value[0]}).length>0)storedValue.filter(function(e){e.text==value[0]&&(e.clicks+=parseFloat(value[1]))});else{var temp={};temp.text=value[0],temp.clicks=value[1],storedValue.push(temp)}}else if("append"===collectType){var storedValue=localStorageData[dataType][sectionName].value;if(storedValue.constructor===Array)storedValue.push(value);else{var temp=[];temp.push(storedValue,value),storedValue=temp}localStorageData[dataType][sectionName].value=storedValue}else if("add"===collectType)null==localStorageData[dataType][sectionName].value||void 0==localStorageData[dataType][sectionName].value||""==localStorageData[dataType][sectionName].value?localStorageData[dataType][sectionName].value=1:localStorageData[dataType][sectionName].value+=parseFloat(value);else{if("replace"!==collectType)return console.log("Argument passed is not correct"),!1;localStorageData[dataType][sectionName].value=value}return localStorageData[dataType][sectionName].collectType=collectType,MkTracker.storage.saveData(localStorageData),MkTracker.storage.isUpdated(!0),!0},MkTracker.storage.saveData=function(data){return null===localStorage.getItem("MkTrackingDataUpdateStatus")&&localStorage.setItem("MkTrackingDataUpdateStatus",!1),localStorage.setItem("MkTrackingData",JSON.stringify(data)),!0},MkTracker.storage.loadData=function(){return JSON.parse(localStorage.getItem("MkTrackingData"))},MkTracker.storage.retrieveData=function(searchString){var localData=MkTracker.storage.loadData();return null!=localData[searchString]?localData[searchString]:(console.log("Element is not defined"),!1)},MkTracker.storage.isUpdated=function(status){localStorage.setItem("MkTrackingDataUpdateStatus",status)},MkTracker.storage.clearData=function(keyName){return localStorage.removeItem(keyName),!0},MkTracker.sendDataToServer=function(serverUrl){if(0==localStorage.getItem("MkTrackingDataUpdateStatus"))return!1;MkTracker.postAjax(ajaxurl,{action:"mk_frontend_side_tracking_data",data:JSON.stringify(MkTracker.storage.loadData())},function(data){data=JSON.parse(data),data.hasOwnProperty("status")?data.status?(MkTracker.storage.isUpdated(!1),MkTracker.storage.clearData("MkTrackingData")):console.log("Can not save tracking data to server because of : "+data):console.log("Can not send tracking data to server because of : "+data)})},MkTracker.postAjax=function(url,data,success){var params="string"==typeof data?data:Object.keys(data).map(function(k){return encodeURIComponent(k)+"="+encodeURIComponent(data[k])}).join("&"),xhr=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");return xhr.open("POST",url),xhr.onreadystatechange=function(){xhr.readyState>3&&200==xhr.status&&success(xhr.responseText)},xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),xhr.send(params),xhr},MkTracker.addListener=function(evnt,elem,func){if(elem.addEventListener)elem.addEventListener(evnt,func,!1);else{if(elem.attachEvent){return elem.attachEvent("on"+evnt,func)}console.log("Can not attache "+evnt+" to document")}},MkTracker.isEmpty=function(obj){if(null==obj)return!0;if(obj.length>0)return!1;if(0===obj.length)return!0;if("object"!=typeof obj)return!0;for(var key in obj)if(hasOwnProperty.call(obj,key))return!1;return!0},MkTracker.trim=function(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},MkTracker.childOf=function(c,p){for(;(c=c.parentNode)&&c!==p;);return!!c},MkTracker.init=function(options){if(MkTracker.isEmpty(options.tracks))return!1;var sendToServer=!0,tracks={},serverUrl=ajaxurl;options&&(sendToServer=options.sendToServer||sendToServer,tracks=options.tracks||tracks,serverUrl=options.serverUrl||serverUrl);var clicks={},loadTime={},textValues={};for(var id in tracks)switch(tracks[id].collect){case"click":case"total-clicks":clicks[id]=tracks[id];break;case"loadtime":loadTime[id]=tracks[id];break;case"text-values":textValues[id]=tracks[id]}MkTracker.isEmpty(clicks)||MkTracker.clickCounter(clicks),MkTracker.isEmpty(loadTime)||MkTracker.loadTimeCalc(loadTime),MkTracker.isEmpty(textValues)||MkTracker.textCounter(textValues),sendToServer&&MkTracker.addListener("load",window,MkTracker.sendDataToServer(serverUrl))},MkTracker}():console.log("MkTracker already defined.")}(window),function(){elements={'body[class*="jupiter_page_theme-"]':{collect:"total-clicks",collectType:"add",storageTitle:"control-panel-total-clicks"},'a[href*="page=theme-announcements"]':{collect:"click",collectType:"add",storageTitle:"announcements-tab"},'a[href*="page=Jupiter"]':{collect:"click",collectType:"add",storageTitle:"register-tab"},'a[href*="page=theme-support"]':{collect:"click",collectType:"add",storageTitle:"support-tab"},'a[href*="page=theme-plugins"]':{collect:"click",collectType:"add",storageTitle:"plugins-tab"},'a[href*="page=theme-addons"]':{collect:"click",collectType:"add",storageTitle:"addons-tab"},'a[href*="page=theme-templates"]':{collect:"click",collectType:"add",storageTitle:"templates-tab"},'a[href*="page=theme-status"]':{collect:"click",collectType:"add",storageTitle:"status-tab"},'a[href*="page=theme-updates"]':{collect:"click",collectType:"add",storageTitle:"updates-tab"},'img[src*="register-product-tuts-video.jpg"]':{collect:"click",collectType:"add",storageTitle:"video-tutorial-thumbnail"},".how-to-video-list a i":{collect:"click",collectType:"add",storageTitle:"video-tutorial-thumbnail"},'a[href*="docs/how-to-register-theme"] strong':{collect:"click",collectType:"add",storageTitle:"view-tutorial-here-link"},'a[href*="why-i-need-to-register-my-theme"]':{collect:"click",collectType:"add",storageTitle:"why-i-need-to-register-my-theme-link"},'a[href*="how-can-i-verify-my-api-key"]':{collect:"click",collectType:"add",storageTitle:"how-can-i-verify-my-api-key-link"},'a[href*="why-my-api-key-inactive"]':{collect:"click",collectType:"add",storageTitle:"why-my-api-key-inactive-link"},'a[href*="what-are-the-benefits-of-registration"]':{collect:"click",collectType:"add",storageTitle:"what-are-the-benefits-of-registration-link"},'a[href*="how-can-i-obtain-my-purchase-code"]':{collect:"click",collectType:"add",storageTitle:"how-can-i-obtain-my-purchase-code-link"},'a[href*="i-get-this-error-when-registering-my-theme-duplicated-purchase-key-detected"]':{collect:"click",collectType:"add",storageTitle:"i-get-this-error-when-registering-my-theme-duplicated-purchase-key-detected-link"},'a[href$="artbees.net/support/jupiter/docs"]':{collect:"click",collectType:"add",storageTitle:"documentation-link"},'a[href$="artbees.net/support/jupiter/videos"]':{collect:"click",collectType:"add",storageTitle:"videos-link"},'a[href$="artbees.net/support/jupiter/faq"]':{collect:"click",collectType:"add",storageTitle:"faq-link"},'a[href$="artbees.net/support/jupiter"]':{collect:"click",collectType:"add",storageTitle:"ask-our-experts-link"},'a[href$="artbees.net/c/jupiter"]':{collect:"click",collectType:"add",storageTitle:"join-community-link"},'a[href$="artbees.net/artbees-care"]':{collect:"click",collectType:"add",storageTitle:"customise-jupiter-link"},'a[href*="/?post_type=announcement"]':{collect:"click",collectType:"add",storageTitle:"announcement-post-link"},".mk-template-item-btn-preview":{collect:"click",collectType:"add",storageTitle:"template-preview-btn"},".mk--update-btn":{collect:"click",collectType:"add",storageTitle:"update-btn"},'ul[class*="cp-tabs-holder"]':{collect:"loadtime",collectType:"append",storageTitle:"control-panel-loadtime"},".mk-templates-categories":{collect:"text-values",collectType:"mixed",storageTitle:"template-categories-data"},".mk-search-template":{collect:"text-values",collectType:"mixed",storageTitle:"template-search-data"}},MkTracker.init({tracks:elements,sendToServer:!0,serverUrl:ajaxurl})}();