// 可以手动或自动改变一个枚举的值，但是必须是常量
var UserResponse;
(function (UserResponse) {
    UserResponse[UserResponse["No"] = 0] = "No";
    UserResponse[UserResponse["Yes"] = 1] = "Yes";
})(UserResponse || (UserResponse = {}));
function respond(recipient, message) {
    // ...
}
respond("Princess Caroline", UserResponse.Yes);
