const GoogleAssistant=require("@bugsounet/google-assistant"),B2M=require("@bugsounet/node-buffertomp3"),Record=require("@bugsounet/node-lpcm16"),path=require("path"),fs=require("fs");var _log=Function.prototype.bind.call(console.log,console,"[ASSISTANT:AS]"),log=function(){};class ASSISTANT{constructor(t,e=(()=>{})){var s=!!t.debug&&t.debug;this.modulePath=t.modulePath,this.micConfig=t.micConfig,this.useAudioOutput=t.useAudioOutput,this.assistantConfig={auth:{keyFilePath:path.resolve(t.modulePath,t.credentialPath),savedTokensPath:path.resolve(t.modulePath,t.tokenPath)},conversationConfig:{audio:{encodingIn:"LINEAR16",sampleRateIn:16e3,encodingOut:"MP3",sampleRateOut:24e3},deviceLocation:{coordinates:{latitude:t.latitude,longitude:t.longitude}},screen:{isOn:t.useScreenOutput},lang:t.lang}},this.useScreenOutput=t.useScreenOutput,1==s&&(log=_log),this.debug=s,this.micMode=!1,this.tunnel=e,this.mic=null}activate(t,e=(()=>{})){var s,i=t.type;"TEXT"==i&&(this.assistantConfig.conversationConfig.textQuery=t.key),"MIC"==i&&(this.micMode=!0),s=(s=>{this.initConversation(t,s,e)}),this.start(s)}start(t){this.assistant=new GoogleAssistant(this.assistantConfig.auth),this.assistant.on("ready",()=>{this.assistant.start(this.assistantConfig.conversationConfig)}).on("started",t).on("error",e=>{t.end()})}initConversation(t,e,s=(t=>{})){this.response={error:null,action:null,text:null,screen:null,audio:null,transcription:null,continue:!1,volume:null};var i=path.resolve(this.modulePath,"tmp/lastResponse.mp3");if(this.useAudioOutput)var o=new B2M({debug:this.debug,file:i});if(this.mic=null,this.micMode){var n={device:null,recorder:"sox",threshold:0,sampleRate:16e3,verbose:!1,debug:this.debug};this.mic=new Record(Object.assign({},n,this.micConfig),e,t=>{this.afterListening(t)}),log("MIC:RECORDING START."),this.mic.start()}if(e.on("volume-percent",t=>{log("CONVERSATION:VOLUME",t),this.response.volume=t}).on("end-of-utterance",()=>{log("CONVERSATION:END_OF_UTTERANCE"),this.micMode&&this.mic&&this.stopListening()}).on("transcription",t=>{log("CONVERSATION:TRANSCRIPTION",t),this.tunnel({type:"TRANSCRIPTION",payload:t}),this.response.transcription=t}).on("device-action",t=>{log("CONVERSATION:ACTION",t),this.response.action=Object.assign({},this.response.action,t)}).on("response",t=>{log("CONVERSATION:RESPONSE",t),t&&(this.response.text=t)}).on("screen-data",t=>{log("CONVERSATION:SCREEN",typeof t),this.useScreenOutput&&(this.response.screen={originalContent:t.data.toString("utf8")})}).on("audio-data",t=>{this.useAudioOutput&&(log("CONVERSATION:AUDIO",t.length),t.length&&o.add(t))}).on("ended",(e,n)=>{log("CONVERSATION_ALL_RESPONSES_RECEIVED"),e?(log("CONVERSATION_END:ERROR",e),this.response.error=e):n?(log("CONVERSATION_END:CONTINUED"),this.response.continue=!0):(log("CONVERSATION_END:COMPLETED"),this.response.continue=!1),"TEXT"!=t.type||this.response.transcription||(this.response.transcription={transcription:t.key,done:!0}),this.useAudioOutput&&(o.getAudioLength()>50?(log("CONVERSATION_PP:RESPONSE_AUDIO_PROCESSED"),this.response.audio={path:i,uri:"tmp/lastResponse.mp3"}):(log("CONVERSATION_PP:RESPONSE_AUDIO_TOO_SHORT_OR_EMPTY - ",o.getAudioLength()),this.response.error="TOO_SHORT"),o.close()),s(this.response)}).on("error",t=>{this.useAudioOutput&&o.close(),log("CONVERSATION_ERROR: "+t),this.response.error="CONVERSATION_ERROR","14"==t.code&&log(">> This error might happen when improper configuration or invalid Mic setup."),this.stopListening(),e.end(),s(this.response)}),t.key&&"WAVEFILE"==t.type)fs.createReadStream(t.key,{highWaterMark:4096}).pipe(e);"TEXT"==t.type&&this.tunnel({type:"TRANSCRIPTION",payload:{transcription:t.key,done:!0}})}stopListening(){this.mic&&(log("MIC:RECORDING_END"),this.mic.stop(),this.mic=null)}afterListening(t){if(t)return log("[ERROR] "+t),void this.stopListening();this.stopListening()}}module.exports=ASSISTANT;
