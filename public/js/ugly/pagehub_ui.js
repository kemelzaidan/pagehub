pagehub_ui=function(){function m(){return $(this).parent("[disabled],:disabled,.disabled").length>0?!1:(y($("a.listlike.selected")),$(this).next("ol").show(),$(this).addClass("selected"),$(this).unbind("click",m),$(this).bind("click",g),!1)}function g(e){return e.preventDefault(),y($(this)),!1}function y(e){$(e).removeClass("selected"),$(e).next("ol").hide(),$(e).unbind("click",g),$(e).bind("click",m)}function b(){return ui.is_page_selected()?ui.current_page().attr("id").replace(/\w+_/,""):null}function w(){return ui.is_folder_selected()?ui.current_folder().parent().attr("id").replace("folder_",""):null}var e={on_entry:[]},t=null,n=null,r="",i=!1,s=250,o=!1,u=null,a=[],f=2500,l=30,c={status:1},h={},p={},d={pages:{on_load:[]}},v=[function(){dynamism.configure({debug:!1,logging:!1})},function(){$("[data-collapsible]").each(function(){var e="<button                 data-dyn-hook='click, ui.collapse'                 data-dyn-inject='@data-folder, folders.id'                 data-collapse>&minus;</button>";$(this).append(e)})},function(){$("#resource_editor input[type=text]").keyup(function(e){e.which==13?(e.preventDefault(),ui.resource_editor.save()):e.which==27&&(e.preventDefault(),ui.resource_editor.hide())}).click(function(e){e.preventDefault()}),$("#update_title").click(function(){return ui.resource_editor.save()}),$("#cancel_title_editing").click(function(){return ui.resource_editor.hide()})},function(){pagehub!==undefined&&pagehub.settings.editing.autosave&&(n=setInterval("ui.pages.save(true)",l*1e3))},function(){$("a[data-disabled], a.disabled").click(function(e){return e.preventDefault(),!1})},function(){$("#flashes button").click(function(){$(this).parent().next("hr:first").remove(),$(this).parent().addClass("hidden"),$(".flash_wrap").addClass("hidden")})},function(){$("a.listlike:not(.selected)").bind("click",m),$("ol.listlike li:not(.sticky), ol.listlike li:not(.sticky) *").click(function(){var e=$(this).parent().prev("a.listlike");return e.hasClass("selected")&&y(e),!0})}];return{hooks:v,theme:r,action_hooks:d,current_page:function(){return $("#page_listing li.selected:not(.folder) a")},current_folder:function(){return $("#page_listing .folder > .selected")},is_page_selected:function(){return ui.current_page().length!=0},is_folder_selected:function(){return ui.current_folder().length!=0},create_editor:function(e,t){t=t||{},mxvt.markdown.setup_bindings();var n=CodeMirror.fromTextArea(document.getElementById(e),$.extend({mode:"markdown",lineNumbers:!1,matchBrackets:!0,theme:"neat",tabSize:2,gutter:!1,autoClearEmptyLines:!1,lineWrapping:!0,keyMap:"mxvt"},t));return n},collapse:function(){$(this).attr("data-collapsed")?($(this).siblings(":not(span.folder_title)").show(),$(this).attr("data-collapsed",null).html("&minus;"),pagehub.settings.runtime.cf.pop_value($(this).attr("data-folder")),pagehub.settings_changed=!0):($(this).siblings(":not(span.folder_title)").hide(),$(this).attr("data-collapsed",!0).html("&plus;"),pagehub.settings.runtime.cf.push($(this).attr("data-folder")),pagehub.settings_changed=!0)},status:{clear:function(e){if(!$("#status").is(":visible"))return(e||function(){})();$("#status").addClass("hidden").removeClass("visible"),o=!1,e&&e();if(a.length>0){var t=a.pop();return ui.status.show(t[0],t[1],t[2])}},show:function(e,n,r){n||(n="notice"),r||(r=c.status);if(o&&u!="pending")return a.push([e,n,r]);t&&clearTimeout(t),t=setTimeout("ui.status.clear()",n=="bad"?f*2:f),$("#status").removeClass("pending good bad").addClass(n+" visible").html(e),o=!0,u=n},mark_pending:function(){$(".loader").show()},mark_ready:function(){$(".loader").hide()}},is_editing:function(){return ui.is_page_selected()&&!$("#page_actions").hasClass("disabled")},on_action:function(e,t,n){var r={is_editor_action:!0},n=$.extend(r,n||{});h[e]||(h[e]={props:n,handlers:[]}),h[e].handlers.push(t)},action:function(e){var t=h[e];if(!t)return!0;if(!ui.is_editing()&&t.props.is_editor_action)return!1;for(var n=0;n<t.handlers.length;++n)t.handlers[n]();return!1},resource_editor:{show:function(){if(!ui.is_folder_selected()&&!ui.is_page_selected()){console.log("ERROR: nothing is selected, can't show resource editor");return}var e=ui.is_folder_selected()?ui.current_folder():ui.current_page(),t=$("#resource_editor"),n=t.find("input[type=text][name=title]");e.hide(),t.show(),e.after(t),n.attr("value",e.html().trim()).focus();if(ui.is_folder_selected()){var r=e.parent().attr("data-parent");r||(r="0"),t.find("select :selected").attr("selected",null),t.find("select option[value=folder_"+r+"]").attr("selected","selected"),e.parent().find("li.folder").add(e.parent()).each(function(){t.find("select option[value="+$(this).attr("id")+"]").hide()})}return!0},hide:function(e){if(!ui.is_folder_selected()&&!ui.is_page_selected())return;var t=ui.is_folder_selected()?ui.current_folder():ui.current_page(),n=$("#resource_editor"),r=n.find("input[type=text][name=title]");$("body").append(n.hide()),t.show(),ui.is_folder_selected()&&(t.siblings("button[data-dyn-action=remove]:hidden").show(),ui.dehighlight("folder"),n.find("option:hidden").show(),$("#parent_folder_selection").hide())},save:function(){var e=null;if(!ui.is_folder_selected()&&!ui.is_page_selected()){console.log("ERROR: nothing is selected, can't show resource editor");return}var t=$("#resource_editor input[type=text][name=title]").attr("value");ui.is_folder_selected()?(e=w(),$("#parent_folder_selection select :selected").length==0&&$("#parent_folder_selection select option:first").attr("selected","selected"),parent_folder=$("#parent_folder_selection select :selected").attr("value").replace("folder_",""),ui.status.show("Updating folder...","pending"),pagehub.folders.update(e,{title:t,folder_id:parent_folder},function(e){var e=JSON.parse(e);ui.folders.on_update(e)},function(e){ui.status.show("Unable to update folder: "+e.responseText,"bad")})):(e=b(),ui.status.show("Saving page title...","pending"),pagehub.pages.update(e,{title:t},{success:ui.pages.on_update,error:function(e){ui.status.show("Unable to update page: "+e.responseText,"bad")}})),ui.resource_editor.hide(!0)}},dialogs:{destroy_group:function(e){return window.location.href=$(e).attr("href"),!1},destroy_page:function(){if(!ui.is_page_selected())return!1;$("a.confirm#destroy_page").click()}},report_error:function(e){ui.status.show("A script error has occured, please try to reproduce the bug and report it.","bad"),console.log(e)},highlight:function(e){e=e||$(this),ui.dehighlight(e.hasClass("folder_title")?"folder":"page"),e.addClass("selected"),ui.is_folder_selected()||e.append($("#indicator").show())},dehighlight:function(e){e=="folder"?ui.current_folder().removeClass("selected"):ui.current_page().parent().removeClass("selected")},folders:{create:function(){try{$.ajax({url:pagehub.namespace+"/folders/new",success:function(e){pagehub.confirm(e,"Create a new folder",function(e){ui.status.show("Creating a new folder...","pending"),pagehub.folders.create($("#confirm form#folder_form").serialize(),{success:function(e){var e=JSON.parse(e);console.log(e),dynamism.inject({folders:[e]},$("#page_listing")),ui.status.show("Folder "+e.title+" has been created.","good")},error:function(e){ui.status.show(e.responseText,"bad")}})})}})}catch(e){log(e)}return $("a.listlike.selected").click(),!1},on_update:function(e){ui.status.show("Folder updated!","good"),console.log(e);var t=$("#folder_"+e.id);e.parent?t.attr("data-parent",e.parent):t.attr("data-parent",null),t.find("> span:first").html(e.title),ui.folders.arrange($("#page_listing")),$("a[data-action=move][data-folder="+e.id+"]").html(e.title),$("#resource_editor option[value=folder_"+e.id+"]").html(e.title)},on_injection:function(e){var t=parseInt(e.attr("id").replace("folder_","")),n=t==0;e.find("> ol > li[data-dyn-index][data-dyn-index!=-1]").length>0?e.find("> ol > li:first").hide():e.find("> ol > li:first").show();if(n)e.addClass("general-folder"),e.find("> button[data-dyn-action=remove]").remove(),e.find("> a[data-action=move]").remove(),e.find("> select").remove(),e.find("> button[data-collapse]").hide();else{var r=e.find("a[data-action=move]");r.length==1&&$("#movement_listing").append("<li></li>").find("li:last").append(r),$("#parent_folder_selection select").append('<option value="'+e.attr("id")+'">'+e.find("> span").html()+"</option>"),pagehub.settings.runtime.cf.has_value(t)&&e.find("button[data-collapse]").click()}var s=n?e.get(0):e.find("> span.folder_title:first").get(0);e.find("[draggable=true]").bind("dragstart",function(e){var t=e.originalEvent;return $("#page_listing .drag-src").removeClass("drag-src"),$(this).addClass("drag-src"),t.dataTransfer.setData("ignore_me","fubar"),i=!0,!0}),s.addEventListener("dragenter",function(){$("#page_listing").find(".drop-target").removeClass("drop-target"),$(this).is("li")?$(this).addClass("drop-target"):$(this).parent().addClass("drop-target"),$(this).append($("#indicator").show()),$(this).append($("#drag_indicator").show())}),s.addEventListener("dragleave",function(e){return e.preventDefault(),!1});var o=function(e){e.preventDefault(),e.stopPropagation();if(!i)return $("#indicator").hide(),$("#drag_indicator").hide(),!1;var t=$("#page_listing .drag-src");console.log(t),i=!1;if(t.hasClass("folder_title")){var n=t.parent().attr("id").replace("folder_",""),r=$(this).hasClass("general-folder")?$(this).attr("id").replace("folder_",""):$(this).parent().attr("id").replace("folder_","");pagehub.folders.update(n,{folder_id:r},function(e){ui.folders.on_update(JSON.parse(e))},function(e){ui.status.show("Unable to move folder: "+e.responseText,"bad")})}else{var s=$("#page_listing .drag-src a").attr("id").replace("page_",""),o=$(this).hasClass("general-folder")?$(this).attr("id").replace("folder_",""):$(this).parent().attr("id").replace("folder_",""),u=$("#page_listing .drag-src a"),a=$("a[data-action=move][data-folder="+o+"]");b()!=s?(d.pages.on_load.push(function(){a.click(),d.pages.on_load.pop()}),u.click()):a.click()}return $("#page_listing .drag-src, #page_listing .drop-target").removeClass("drag-src drop-target"),$("#indicator").hide(),$("#drag_indicator").hide(),!1};s.addEventListener("drop",o),s.addEventListener("dragend",o),s.addEventListener("dragover",function(e){return e.preventDefault(),!1})},arrange:function(e){ui.status.mark_pending(),e.prepend(e.find("li.folder:not([data-parent]):visible")),e.find("li.folder[data-parent]:visible").each(function(){var e=parseInt($(this).attr("data-parent")||"0"),t=$("#folder_"+e);t.length==1?t.find("> ol").append($(this)):(console.log("[ERROR]: Unknown parent "+e+"!"),console.log($(this)))});var t=function(e){e.find("> li.folder:visible").sort(function(e,t){var n=$(e).find("> span:first-child").html().trim().toUpperCase(),r=$(t).find("> span:first-child").html().trim().toUpperCase();return n<r?-1:n>r?1:0}).each(function(t,n){e.append(n)})};t(e),e.find("ol > li.folder:visible").each(function(){t($(this).parent())});var n=$("#page_listing").find(".folder.general-folder");$("#page_listing").append(n),ui.status.mark_ready()},edit_title:function(){return $("#resource_editor").is(":visible")&&ui.resource_editor.hide(),ui.highlight($(this)),$(this).siblings("button[data-dyn-action=remove]:visible").hide(),$("#parent_folder_selection").show(),ui.resource_editor.show()},on_removal:function(e,t){var n=e.attr("id").replace("folder_","");if(!p[e.attr("id")])throw pagehub.folders.destroy(n,function(n){var n=JSON.parse(n);ui.status.show("Re-building the entire page listing,this could take a while...","pending"),p[e.attr("id")]=!0,e.find("li[data-dyn-entity=folder]").add(e).each(function(){var e=$(this).attr("id").replace("folder_","");$("a[data-action=move][data-folder="+e+"]").parent().remove(),$("#resource_editor option[value=folder_"+e+"]").remove()}),t.click(),dynamism.inject(n,$("#page_listing")),ui.status.show("Folder deleted.","good")},function(e){ui.status.show("Unable to delete folder: "+e.responseText,"bad")}),"Halting."},highlight:function(){var e=$(this);$(this).hasClass("highlighted")?$("span.folder_title.highlighted").removeClass("highlighted"):($(this).addClass("highlighted"),$(this).parents(".folder").find("> span.folder_title").addClass("highlighted"))}},pages:{create:function(){return ui.status.show("Creating a new page...","pending"),pagehub.pages.create({success:function(e){var e=JSON.parse(e);dynamism.inject({folders:[{id:0,pages:[e]}]},$("#page_listing")),$("#page_"+e.id).click(),$(".general-folder li:not([data-dyn-entity]):first").hide(),ui.editor.setValue("Preparing newly created page... hold on.")},error:function(e){ui.status.show("Could not create a new page: "+e.responseText,"bad"),console.log("smth bad happened"),console.log(e)}}),$("a.listlike.selected").click(),!0},load:function(){if($(this).parent().hasClass("selected"))return ui.resource_editor.show(),!1;$("#page_actions").removeClass("disabled"),ui.resource_editor.hide(),ui.highlight($(this).parent()),ui.status.mark_pending(),ui.editor.save();var e=$(this).attr("id").replace("page_","");return $.ajax({type:"GET",url:pagehub.namespace+"/pages/"+e+".json",success:function(t){var t=JSON.parse(t),n=t.content,r=t.groups;ui.editor.clearHistory(),ui.editor.setValue(n),$("#preview").attr("href",pagehub.namespace+"/pages/"+e+"/pretty"),$("#share_everybody").attr("href",pagehub.namespace+"/pages/"+e+"/share"),$("#history").attr("href",pagehub.namespace+"/pages/"+t.id+"/revisions").html($("#history").html().replace(/\d+/,t.nr_revisions)),t.nr_revisions==0?$("#history").attr("disabled","true").addClass("disabled"):$("#history").attr("disabled",null).removeClass("disabled"),$("a[data-action=share][data-group]").each(function(){var t=$(this).attr("data-group"),n=!1;for(var i=0;i<r.length;++i)if(r[i]==t){$(this).attr("data-disabled",!0),n=!0;break}n?($(this).attr("href",null),$(this).attr("data-disabled",!0)):($(this).attr("href",pagehub.namespace+"/pages/"+e+"/share/"+t),$(this).attr("data-disabled",null))}),$("a[data-action=move]").attr("data-disabled",null),$("a[data-action=move][data-folder="+t.folder+"]").attr({"data-disabled":!0}),$("a[data-action=move]").each(function(){$(this).attr("href",pagehub.namespace+"/folders/"+$(this).attr("data-folder")+"/add/"+t.id)});for(var i=0;i<d.pages.on_load.length;++i)d.pages.on_load[i](t);ui.editor.focus()},complete:function(){ui.status.mark_ready()}}),!1},save:function(e){if(!ui.is_page_selected())return;var t=b(),n=ui.editor.getValue(),r={};e||(r={success:function(e){var e=JSON.parse(e);ui.status.show("Page updated.","good"),e.nr_revisions==0?$("#history").attr("disabled","true").addClass("disabled"):$("#history").attr("disabled",null).removeClass("disabled")},error:function(e){ui.status.show("Unable to update page: "+e.responseText,"bad")}}),pagehub.pages.update(t,{content:n,autosave:e},r),pagehub.sync()},on_update:function(e){var e=JSON.parse(e);ui.status.show("Page updated!","good");var t=$("#page_"+e.id);t.html(e.title)},destroy:function(){if(!ui.is_page_selected())return;var e=ui.current_page(),t=b(),n=e.html();ui.resource_editor.hide(),pagehub.pages.destroy(t,function(){ui.status.show("Page "+n+" has been deleted.","good"),e.parent().remove(),ui.editor.setValue(""),ui.actions.addClass("disabled"),ui.resource_editor.hide(),$(".general-folder > ol > li:visible").length==0&&$(".general-folder > ol > li:hidden:first").show()},function(e){ui.status.show("Page could not be destroyed: "+e.responseText,"bad")})},move:function(){if($(this).attr("data-disabled"))return!1;var e=$(this).attr("href"),t=ui.current_page().parent(),n=t.parents("li.folder:first"),r=$(this).attr("data-folder");return $.ajax({url:e,type:"PUT",success:function(e){var e=JSON.parse(e),r=$("#folder_"+e.folder),i=t.parent();r.find("> ol > li:not(.folder):last").after(t),r.find("> ol > li:first").hide(),i.find("> li:not(.folder):visible").length==0&&i.find("> li:first:hidden").show(),$("a[data-action=move][data-folder="+n.attr("id").replace("folder_","")+"]").attr("data-disabled",null),$("a[data-action=move][data-folder="+e.folder+"]").attr({"data-disabled":!0})},error:function(e){last_error=e,ui.status.show(e.responseText,"bad")}}),!1},preview:function(){if(!ui.is_page_selected())return!0;window.open(pagehub.namespace+"/pages/"+b()+"/pretty","_pretty")}}}},ui=new pagehub_ui,$(function(){for(var e=0;e<ui.hooks.length;++e)ui.hooks[e]()});