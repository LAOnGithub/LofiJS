//--
// [ Lofi Notice ]
// I will be doing this lua way of format, the code may be messy to achieve the lua's goal.
//--

var LOFI_MODES = [
    "Static",
    "Switch",
    "Sway"
]

var LOFI_YAW_MODE = UI.AddDropdown( "Yaw Mode", LOFI_MODES );
var LOFI_YAW_BASE = UI.AddSliderInt( "Yaw Base Value", -180, 180 );
var LOFI_YAW_FROM = UI.AddSliderInt( "Yaw From Value", -180, 180 );
var LOFI_YAW_TO = UI.AddSliderInt( "Yaw To Value", -180, 180 );
var LOFI_YAW_INT = UI.AddSliderInt( "Yaw Tick Interval", 2, 64 );

var LOFI_ROT_MODE = UI.AddDropdown( "Rotation Mode", LOFI_MODES ); 
var LOFI_ROT_BASE = UI.AddSliderInt( "Rotation Base Value", -180, 180 ); 
var LOFI_ROT_FROM = UI.AddSliderInt( "Rotation From Value", -180, 180 ); 
var LOFI_ROT_TO = UI.AddSliderInt( "Rotation To Value", -180, 180 ); 
var LOFI_ROT_INT = UI.AddSliderInt( "Rotation Tick Interval", 2, 64 ); 

var LOFI_LBY_MODE = UI.AddDropdown( "LBY Mode", LOFI_MODES ); 
var LOFI_LBY_BASE = UI.AddSliderInt( "LBY Base Value", -180, 180 );
var LOFI_LBY_FROM = UI.AddSliderInt( "LBY From Value", -180, 180 );
var LOFI_LBY_TO = UI.AddSliderInt( "LBY To Value", -180, 180 );
var LOFI_LBY_INT = UI.AddSliderInt( "LBY Tick Interval", 2, 64 );

var LOFI_SWITCH = function(START, END, FROM, TO) {
    var INTERVAL_LENGTH = END-START;
    var LENGTH_PROGRESS = (Global.Tickcount() - START) / INTERVAL_LENGTH;
    if (LENGTH_PROGRESS < 0.5) {
        return FROM
    } else {
        return TO
    }
}

var LOFI_SWAY = function(START, END, FROM, TO) {
    var INTERVAL_LENGTH = END-START;
    var LENGTH_PROGRESS = (Global.Tickcount() - START) / INTERVAL_LENGTH
    if (LENGTH_PROGRESS < 0.5) {
        return FROM + (TO-FROM) * (LENGTH_PROGRESS * 2)
    } else {
        return FROM + (TO-FROM) * 2 - (TO-FROM) * (LENGTH_PROGRESS * 2)
    }
}

var LOFI_DRAW = function() {
    var YAW, ROT, LBY;
    var YAW_MODE = LOFI_MODES[UI.GetValue("Yaw Mode")];
    var ROT_MODE = LOFI_MODES[UI.GetValue("Rotation Mode")]
    var LBY_MODE = LOFI_MODES[UI.GetValue("LBY Mode")]

    var START_TICK = Math.floor( Global.Tickcount() / UI.GetValue("Yaw Tick Interval") ) * UI.GetValue("Yaw Tick Interval")
    var END_TICK = Math.floor( Global.Tickcount() / UI.GetValue("Yaw Tick Interval") + 1 ) * UI.GetValue("Yaw Tick Interval")
    if (YAW_MODE == "Static") {
        YAW = UI.GetValue("Yaw Base Value")
    } else if(YAW_MODE == "Switch") {
        YAW = LOFI_SWITCH(START_TICK, END_TICK, UI.GetValue("Yaw From Value"), UI.GetValue("Yaw To Value"))
    } else if(YAW_MODE == "Sway") {
        YAW = LOFI_SWAY(START_TICK, END_TICK, UI.GetValue("Yaw To Value"), UI.GetValue("Yaw To Value"))
    }

    var START_TICK = Math.floor( Global.Tickcount() / UI.GetValue("Rotation Tick Interval") ) * UI.GetValue("Rotation Tick Interval")
    var END_TICK = Math.floor( Global.Tickcount() / UI.GetValue("Rotation Tick Interval") + 1 ) * UI.GetValue("Rotation Tick Interval")
    if (ROT_MODE == "Static") {
        ROT = UI.GetValue("Rotation Base Value")
    } else if(ROT_MODE == "Switch") {
        ROT = LOFI_SWITCH(START_TICK, END_TICK, UI.GetValue("Rotation From Value"), UI.GetValue("Rotation To Value"))
    } else if(ROT_MODE == "Sway") {
        ROT = LOFI_SWAY(START_TICK, END_TICK, UI.GetValue("Rotation From Value"), UI.GetValue("Rotation To Value"))
    }

    var START_TICK = Math.floor( Global.Tickcount() / UI.GetValue("LBY Tick Interval") ) * UI.GetValue("LBY Tick Interval")
    var END_TICK = Math.floor( Global.Tickcount() / UI.GetValue("LBY Tick Interval") + 1 ) * UI.GetValue("LBY Tick Interval")
    if (LBY_MODE == "Static") {
        LBY = UI.GetValue("Yaw Base Value")
    } else if(LBY_MODE == "Switch") {
        LBY = LOFI_SWITCH(START_TICK, END_TICK, UI.GetValue("LBY From Value"), UI.GetValue("LBY To Value"))
    } else if(LBY_MODE == "Sway") {
        LBY = LOFI_SWAY(START_TICK, END_TICK, UI.GetValue("LBY From Value"), UI.GetValue("LBY To Value"))
    }

    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset( YAW );
    AntiAim.SetFakeOffset( ROT );
    AntiAim.SetLBYOffset( LBY );
}

function Unload() {
    AntiAim.SetOverride(0);
}

Cheat.RegisterCallback("Draw", "LOFI_DRAW");
Cheat.RegisterCallback("Unload", "Unload")
