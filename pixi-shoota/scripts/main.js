var ps
requirejs([
    "PlatformShooter",
    "sprites/Platform",
    "sprites/Player",
    "sprites/Bullet",
    "helper/util"
], function (util) {
    ps = new PlatformShooter()
})