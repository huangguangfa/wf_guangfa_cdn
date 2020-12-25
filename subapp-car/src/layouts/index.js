import layYou from './index.scss';
import router from 'umi/router';

function BasicLayout(props) {
    const menuList = [
        {
            "mName":"车辆列表",
            "url":"/list"
        },
        {
            "mName":"车辆类型",
            "url":"/type"
        }
    ]
    return (
        <div className={layYou.car}>
            <ul className={layYou.sidebar}>
                <p className={layYou.sysTitle}>react车辆系统管理</p>
                {
                   menuList.map( item =>{ 
                       return  <li
                            className={props.location.pathname === item.url?layYou.currentRouter:''}
                            onClick={ () =>{ router.push(item.url) } } 
                            key={item.url}> 
                            { item.mName }
                        </li> 
                    })
                }
            </ul>
            <div className={layYou.carPageContent}>
                { props.children }
            </div>
        </div>
    );
}

export default BasicLayout;
