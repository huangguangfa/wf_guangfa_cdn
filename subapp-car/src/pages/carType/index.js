import carType from './index.scss';
import router from 'umi/router';
import { Rate } from 'antd';
import { routerGo } from '../../utils/utils'
export default function(){
    const toRouter = () =>{
        router.push('/list');
    }
    return(
        <div className={carType.carType}>
            <p>车辆 <span className={carType.prompt}>类型</span> Page</p>
            <p className={carType.torouter} onClick={toRouter}>返回车辆列表页面</p>
            <div>微前端打分：<Rate></Rate></div>
            <div className={carType.toApplay} onClick={ () =>{ routerGo('/sys/user') }}>跨应用跳转到 vue 系统管理</div> 
        </div>
    )
}