//从react中引入useState
import React, {useState} from 'react'
//函数式组件不需要定义class以及render方法，他本身return一个jsx模版就可以实现页面渲染
//所以函数式组件通过结合useState可以实现更加便捷的开发react的页面
function Test1() {
    //通过useState创建useranme变量，以及setUsername的方法
    //只有通过setUsername更新才能使页面的值同步更新
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123456');
    const [sex, setSex] = useState(true);

    const [roleList, setRoleList] = useState([
        {id: '1', name: '系统管理员'},
        {id: '2', name: '业务管理员'},
        {id: '3', name: '普通用户'}
    ])
    //绑定onChange事件用来同步username的数据
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleSexChange = (gender) => {
        setSex(gender)
    }
    const handleRoleChange = (e) => {
        setRoleList(e.target.value)
    }

    return (
        <div>
            <h4>
                useState的学习
            </h4>
            <div>
                账号是:{username},密码是:{password}
                性别是:{sex ? "男" : "女"},Role是:{roleList.map(obj => JSON.stringify(obj)).join()}
                <form>
                    <input value={username} onChange={handleUsernameChange}/><br/>
                    <input value={password} onChange={handlePasswordChange}/><br/>
                    <label>
                        <span>男</span>
                        <input type={"radio"} checked={sex} onChange={() => handleSexChange(true)}/>
                    </label>
                    <label>
                        <span>女</span>
                        <input type={"radio"} checked={!sex} onChange={() => handleSexChange(false)}/>
                    </label><br/>
                    <select>
                        {
                            (function () {
                                let nodes = [];
                                roleList.forEach(role => {
                                    nodes.push(<option value={role.id}>{role.id}--{role.name}</option>)
                                });
                                return nodes;
                            })()

                        }
                    </select><br/>
                </form>
            </div>
            <h4>
                练习1:增加 sex和roleId属性,模仿之前学习form时的模式做
            </h4>
            <h4>
                练习2:将这个练习中的四个变量整合成一个formData对象，仿照之前学习表单的时候
                做的情况再实现一次
            </h4>
        </div>
    )
}

export default Test1;