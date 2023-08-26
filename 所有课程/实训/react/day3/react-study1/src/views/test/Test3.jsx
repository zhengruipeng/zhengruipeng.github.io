import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import QS from 'qs'

function Test3(props) {
    //通过url路径传参数
    //在react中只能通过手动在url后面通过?key=value&key=value形式去拼接参数才能实现通过
    //？问号参数传参数相当于vue中通过query传参数
    //在从菜单跳转到本页时在？问号拼接了一个参数

    useEffect(() => {
        //如果配置了路由，react组件的props中就会存在history对象和location对象，这个就是路由对象
        //相当于vue中的$router+$route.
        //history对象相当于$router是用来跳页和传参数使用的
        //location对象相当于vue中的$route对象，是用来接值取参数的对象
        console.log(props)
        //以下是从url中取参数的方法，这里需要借助qs库来格式化参数数据
        //从url的？问号后面取出参数的方法
        //这个示例我们简单了解一下即可，等学到umi的时候处理参数就都是自动的不需要我们
        //转换格式，记住参数是通过哪个对象传的就可以
        let search = props.location.search;
        if (search) {
            // console.log(props.location)
            // 通过qs把?key=value&key=value的参数转成json
            let url = new URL("http://domain"+props.location.path+props.location.search);
            let searchParams = url.searchParams;
            // let urlParams = QS.parse(props.location.search.replace('?', ''));
            console.log(searchParams.toString())
        }
    }, [])
    const handleJump = () => {
        //在路由页面中的props参数中可以拿到history对象通过history.push可以跳转页面并传递参数
        //props.history.push({pathname:'页面path',query:{}}) 这里的query可以取任何名字
        //在对应页面的props.location.query拿到参数 相当于vue中通过parmas传递参数
        props.history.push({pathname: '/test4', query: {hello: '123'}})
    }
    return (
        <div>
            <h4>
                react的路由跳页方法
            </h4>
            通过js跳转页面的方法
            <button onClick={handleJump}>跳转到Test4并传递参数</button>
            <br/>
        </div>
    )
}

export default Test3