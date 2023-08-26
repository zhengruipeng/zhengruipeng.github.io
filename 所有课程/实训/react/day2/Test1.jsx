//从react中引入useState
import React,{useState} from 'react'
//函数式组件不需要定义class以及render方法，他本身return一个jsx模版就可以实现页面渲染
//所以函数式组件通过结合useState可以实现更加便捷的开发react的页面
function Test1(){
  //通过useState创建useranme变量，以及setUsername的方法
  //只有通过setUsername更新才能使页面的值同步更新
	const [ username, setUsername ] = useState('admin')
	const [ password, setPassword ] = useState('123456')
	const [ roleList , setRoleList ] = useState([
							{id:'1',name:'系统管理员'},
							{id:'2',name:'业务管理员'},
							{id:'3',name:'普通用户'}
						])
	const [ sex, setSex ] = useState('1')
	const [ roleId, setRoleId ] = useState('1')
	//绑定onChange事件用来同步username的数据
	const handleUsernameChange = (e) => {
		setUsername(e.target.value)
	}
	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}
  const handleSexChange = (e) => {
		console.log(e.target.value)
		//将sex属性设置为当前选中的radio的值
	  setSex(e.target.value)
	}
	const handleRoleChange = (e) => {
		
		setRoleId(e.target.value)
	}


	const [formData ,setFormData] = useState({
		username:'',
		password:'',
		sex:'1',
		roleId:'1'
	})
	const handleFormDataChange = (e,key) => {
		//这里需要给formData做一个复制，因为如果不复制
		//对象的引用地址没有变化，setFormData的时候代码会认为formData没有变更
		//不会更新
		// console.log(e.target.value,key)
		let newFormData = {...formData}
		newFormData[key] = e.target.value
		setFormData(newFormData)
	}
	return (
		<div>
			<h4>
				useState的学习
			</h4>
			<div>
				账号是:{username},密码是:{password},性别是:{sex},角色是:{roleId}
				<form>
					<input value={username} onChange={handleUsernameChange}/><br/>
					<input value={password} onChange={handlePasswordChange}/>
					<br/>
					<label htmlFor="sex1">
						<input id="sex1" name="sex"
							onChange={
								e => {
									handleSexChange(e)
								}
							}
							checked={sex=='1'?'checked':''}
							 value="1" type="radio"/>男
					</label>
					<label htmlFor="sex2">
						<input id="sex2" name="sex"
						 	onChange={
								e => {
									handleSexChange(e)
								}
							}
							checked={sex=='2'?'checked':''}
							 value="2" type="radio"/>女
					</label>
					<br/>
					<select name="" id="" 
						value={roleId}
						onChange={
							e => {
								handleRoleChange(e)
							}
						}>
						{
							roleList.map(item => {
								return (
									<option key={item.id} 
										value={item.id}>
										{item.name}
									</option>
								)
							})
						}
					</select>
				</form>
			</div>
			<h4>
				练习1:增加 sex和roleId属性,模仿之前学习form时的模式做
			</h4>
			<h4>
				练习2:将这个练习中的四个变量整合成一个formData对象，仿照之前学习表单的时候
				做的情况再实现一次
			</h4>
			{JSON.stringify(formData)}
			<form>
				<input value={formData.username}
					onChange={
						e => {
							handleFormDataChange(e,'username')
						}
					}/><br/>
				<input value={formData.password} 
					onChange={
						e => {
							handleFormDataChange(e,'password')
						}
					}/><br/>
				<label htmlFor="sex3">
					<input id="sex3" name="sex1"
						onChange={
							e => {
								handleFormDataChange(e,'sex')
							}
						}
						checked={formData.sex == '1'?'checked':''}
							value="1" type="radio"/>男
				</label>
				<label htmlFor="sex4">
					<input id="sex4" name="sex1"
						onChange={
							e => {
								handleFormDataChange(e,'sex')
							}
						}
						checked={formData.sex == '2'?'checked':''}
							value="2" type="radio"/>女
				</label>
				<br/>
				<select name="" id="" 
					onChange={
						e => {
							handleFormDataChange(e,'roleId')
						}
					}
					value={formData.roleId}
					>
					{
						roleList.map(item => {
							return (
								<option key={item.id} 
									value={item.id}>
									{item.name}
								</option>
							)
						})
					}
				</select>
			</form>
		</div>
	)
}
export default Test1;