import ChartContents from './ChartContents';
import ChartViews from './ChartViews';
import ChartProductsSold from './ChartProductsSold';
import ChartOrders from './ChartOrders';

export default function KOCOverview() {
  // const addLoadingChart = useCallback((elm, height, disabled = false) => {
  //   if (disabled) {
  //     return (
  //       <div
  //         style={{
  //           width: '100%',
  //           textAlign: 'center',
  //           height: '300px',
  //           alignItems: 'center',
  //           display: 'flex',
  //         }}
  //       >
  //         <NoData />
  //       </div>
  //     );
  //   }
  //   return true ? (
  //     elm
  //   ) : (
  //     <div className="w-100 d-flex justify-content-center">
  //       <TailSpin
  //         className="justify-content-center"
  //         height={height}
  //         width="80"
  //         color="#4fa94d"
  //         ariaLabel="tail-spin-loading"
  //         radius="1"
  //         wrapperStyle={{}}
  //         wrapperClass=""
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }, []);

  return (
    <>
      <ChartContents />
      <ChartViews />
      <ChartProductsSold />
      <ChartOrders />
    </>
  );
}
