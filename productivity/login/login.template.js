export function template() {
    return `
    <div class="login">
        <form id="login-form">
            <h4>Login</h4>
            <input type="email" name="email" placeholder="email id" />
            <input type="password" name="password" placeholder="paasword" />
            <input type="submit" name="login" />
        </form>
    </div>
    `;
}