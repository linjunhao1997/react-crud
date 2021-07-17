import style from './login_page.module.css';
const LoginPage = () => {
    return (
        <div className={style.loginBody}>
        <div className={style.login}>
            <h2>用户登录</h2>
            <div className={style.login_box}>
                <input type="text" required/><label>用户名</label>
            </div>
            <div className={style.login_box}>
                <input type="password" required="required"/><label>密码</label>
            </div>
            <a href="javascript:void(0)">
                登录
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>
        </div>
    )
}
export default LoginPage
