foreach=function(e,t){e=e||[];for(var n=0;n<e.length;++n)t(e[n])},log=function(e,t){t=t||"D",console.log("["+t+"] "+e)},Array.prototype.has_value=function(e){for(var t=0;t<this.length;++t)if(this[t]==e)return!0;return!1},Array.prototype.pop_value=function(e){var t=-1;while((t=this.indexOf(e))!=-1)this.splice(t,1);return this},pagehub=function(){var e={resource:""},t="",n=!1,r=!1,i="/profile/preferences/runtime";return $(document).ajaxStart(function(){ui.status.mark_pending()}),$(document).ajaxComplete(function(e){ui.status.mark_ready()}),{config:e,namespace:t,settings_changed:n,content_changed:r,sync:function(){if(!pagehub.settings_changed)return;$.ajax({url:i,type:"PUT",data:{settings:pagehub.settings.runtime},error:function(e){ui.report_error("Unable to synchronize user settings: "+e.responseText)},complete:function(){pagehub.settings_changed=!1}})},pages:{create:function(e){var t=pagehub.namespace+"/pages";$.ajax({url:t,type:"POST",success:e.success,error:e.error})},update:function(e,t,n){var r=pagehub.namespace+"/pages/"+e;$.ajax({type:"PUT",url:r,data:{attributes:t},success:n.success,error:n.error})},destroy:function(e,t,n){var r=pagehub.namespace+"/pages/"+e;$.ajax({type:"DELETE",url:r,success:t,error:n})}},folders:{create:function(e,t){var n=pagehub.namespace+"/folders";$.ajax({url:n,type:"POST",data:e,success:t.success,error:t.error})},update:function(e,t,n,r){var i=pagehub.namespace+"/folders/"+e;$.ajax({type:"PUT",url:i,data:t,success:n,error:r})},destroy:function(e,t,n){var e=e,r=pagehub.namespace+"/folders/"+e;if(!e)throw"undefined id given to pagehub.folders.destroy: "+e;e=parseInt(e);if(isNaN(e)||e==0)throw"bad id given to pagehub.folders.destroy: "+e;$.ajax({type:"DELETE",url:r,success:t,error:n})}}}},pagehub=new pagehub,pagehub.settings=pagehub_settings,pagehub.settings.runtime||(pagehub.settings.runtime={cf:[]}),pagehub_settings=null;