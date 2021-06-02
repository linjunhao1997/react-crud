import { useRequest } from 'ahooks';


function Weather() {
  const { data, error, loading } = useRequest({
    url: '/api/wyJsonList.js',
    method: 'GET',
    headers:{
      'Content-Type':'application/json;charset=UTF-8'
    }
  });
  console.log(data)  

  return (
     
  );
}

export default Weather;