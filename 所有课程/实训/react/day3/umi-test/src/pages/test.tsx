import React, {useEffect, useState} from 'react'
import {Link} from 'umi'

function Test(props: any) {
  const [name, setName] = useState('')
  useEffect(() => {
    console.log(props.location.query)
    setName(props.location.query.name)
  }, [])
  return (
    <div>
      <h4>
        test
        <Link to="/">返回</Link>
      </h4>
      接到的参数为 name:{name}
      <div>
        <Link to="/test/test1">跳转到test1</Link>|
        <Link to="/test/test2">跳转到test2</Link><br/>
        {props.children}
      </div>
    </div>
  )
}

export default Test
