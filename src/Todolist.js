//定义一个组件，第一步
import React,{Component,Fragment} from 'react';
//引入TodoItem这个组件
import TodoItem from './TodoItem';
import axios from 'axios';//由于此处实现ajax失败，因此可以不要这个

//引入一个css文件
import "./style.css";

//创建组件
class Todolist extends Component{
    constructor(props){
        super(props);//调用父类的构造函数，也就是Component的构造函数，这是固定的写法
        this.state = {  //组件的状态，可以存储很多东西，比如数据
            inputValue: '',//input框里面的内容
            list: [] //列表项
        }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    }
    render(){
        return (//注意，render函数返回的所有内容必须在外层添加一个div
            //如果不希望外面一层用一个div包裹，那么可以用React提供的fragment标签
            //这样的话，在DOM树中就没有多余的div了
            <Fragment>
                <div>
                    <label htmlFor='insertArea'>请输入内容</label>
                    <input 
                    id = "insertArea"
                    className='input'
                    value= {this.state.inputValue}
                    onChange = {this.handleInputChange}
                    />{/* 如果要在jsx语法中使用js变量的值，那么需要加括号{} */}
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    {this.getTodoItem()}
                </ul>
            </Fragment>
        )
    }
    
    
    componentDidMount(){
        axios.get('/api/todolist')
            .then((res)=>{
                this.setState(()=>({
                        list: [...res.data]
                    }))
            })
            .catch(()=>{alert('error')})
    }

    getTodoItem(){
        return(
            // 对list数组中的每个元素执行下面的操作    
            this.state.list.map((item,index)=>{
                return( 
                    <TodoItem
                        key={index}
                        content={item} 
                        index={index}
                        deleteItem = {this.handleItemDelete}
                    />
                )
            })
        )
    }
    handleInputChange(e){
        const value= e.target.value;
        this.setState(()=>({
                inputValue : value //e.target表示进行修改的DOM节点
        }))
    }
    handleBtnClick(){
        this.setState((prevState)=>({
            list: [...prevState.list,prevState.inputValue],
            inputValue:''
        }))

    }
    handleItemDelete(index){
        this.setState((prevState)=>{
            const list = [...prevState.list];
            list.splice(index,1);
            return {list}
        })
    }
}
//将组件导出
export default Todolist;