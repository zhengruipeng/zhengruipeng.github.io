// 可以手动或自动改变一个枚举的值，但是必须是常量
enum UserResponse {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
    // ...
}

respond("Princess Caroline", UserResponse.Yes);
