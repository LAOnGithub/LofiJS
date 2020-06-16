var Lofi = {
    Time: 0.6,
    LastHit: Globals.Curtime()
}

Lofi.OnDraw = function() {
    if (Globals.Curtime() < Lofi.LastHit) {
        var Center = Render.GetScreenSize();
        var CenterX = Center[0] / 2
        var CenterY = Center[1] / 2
        var Color = [255, 255, 255, 255 - (255 / Lofi.Time) * (Globals.Curtime() - Lofi.LastHit)]

        // Top
        Render.Line( CenterX - 5, CenterY - 5, CenterX - 10, CenterY - 10, Color )
        Render.Line( CenterX + 5, CenterY - 5, CenterX + 10, CenterY - 10, Color )

        // Bottom
        Render.Line( CenterX - 5, CenterY + 5, CenterX - 10, CenterY + 10, Color )
        Render.Line( CenterX + 5, CenterY + 5, CenterX + 10, CenterY + 10, Color )
    }
}

Lofi.OnEvent = function() {
    var attackerEntity = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    var localEntity = Entity.GetLocalPlayer();
    if (attackerEntity == localEntity) {
        Lofi.LastHit = Entity.GetProp(Entity.GetWeapon(localEntity), "CBaseCombatWeapon", "m_flNextPrimaryAttack")
        Lofi.Time = Entity.GetProp(Entity.GetWeapon(localEntity), "CBaseCombatWeapon", "m_flNextPrimaryAttack") - Globals.Curtime()
    }
}

Cheat.RegisterCallback("Draw", "Lofi.OnDraw")
Cheat.RegisterCallback("player_hurt", "Lofi.OnEvent")
