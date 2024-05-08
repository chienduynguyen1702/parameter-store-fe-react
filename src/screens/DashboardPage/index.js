import { useCallback, useState, useRef } from 'react';
import { TailSpin } from 'react-loader-spinner';

import {
  MixLineBarChart,
  CardDashboardWithGranularity,
  ClusteredBarChart,
} from '../../components';

import SummaryCard from './SummaryCard';

import {
  useOrganizationDashboardLogs,
  useOrganizationDashboardTotal,
} from '../../hooks/data';
import { useParams } from 'react-router-dom';

export default function DashboardPage() {
  const refDashboardHighLight = useRef();

  const { id: organizationId } = useParams();
  const { total } = useOrganizationDashboardTotal(organizationId);

  const [granularity, setGranularity] = useState('day');
  const { logs, isSuccess: isLogsSuccess } = useOrganizationDashboardLogs(
    organizationId,
    granularity,
  );
  console.log('granularity', granularity);
  const addLoadingChart = useCallback(
    (elm, height = 488) =>
      isLogsSuccess ? (
        elm
      ) : (
        <div className="w-100 d-flex justify-content-center">
          <TailSpin
            className="justify-content-center"
            height={height}
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ),
    [isLogsSuccess],
  );

  return (
    // <div className={cn(styles.container)}>
    <>
      <div className="d-flex justify-content-between  row">
        <div className="col-12 col-sm-auto">
          {/* <div className={cn('h3', styles.title)}>Dashboard Highlights</div> */}
          {/* <TextDateFilter /> */}
        </div>
        <div className="d-flex mt-2 mt-sm-0 col-12 col-sm-auto">
          {/* <div className="me-2">
            <DashboardFilter>
              <FormFilter />
            </DashboardFilter>
          </div> */}
          <div>
            {/* <ButtonExport
              handleClickExport={() =>
                handleDownloadPDF(
                  refDashboardHighLight.current.querySelectorAll(
                    'div .print-highlight-dashboard',
                  ),
                )
              }
            /> */}
          </div>
        </div>
      </div>
      <div ref={refDashboardHighLight}>
        <div className="print-highlight-dashboard">
          <SummaryCard
            counters={[
              total?.project_count,
              total?.active_projects_count,
              total?.pending_projects_count,
              total?.workflow_count,
              total?.user_count,

              total?.avg_duration,
              total?.total_updated_this_month,
              total?.total_agent_actions_this_month,
              total?.total_updated,
              total?.total_agent_actions,
            ]}
          />
          <div className="mt-4">
            <CardDashboardWithGranularity
              title={
                'Average Duration of CI/CD Workflows and Parameter Update Count'
              }
              classTitle={'title-purple'}
              granularity={granularity}
              setGranularity={(value) => setGranularity(value)}
            >
              {addLoadingChart(
                <ClusteredBarChart
                  colors={['#659EEA', '#FFBC99']}
                  className={'mt-4'}
                  name={'overLookChart'}
                  height={500}
                  data={logs}
                />,
                // <MixLineBarChart
                //   color={'#FFD3B7'}
                //   hoverColor={'#FFBC99'}
                //   className={'mt-4'}
                //   name={'overLookChart'}
                //   height={488}
                //   data={logs}
                // />,
              )}
            </CardDashboardWithGranularity>
          </div>
          {/* <div className="mt-4">
            <div className="row g-4 g-xl-2">
              <div className="col-12 col-md-6 col-xl-4">
                <Card title={'Top KOCs'} classTitle={'title-blue'}>
                  {addLoadingChart(
                    <CardKOC data={statisticsHighlights?.topKOCs} />,
                    'topKOCs',
                    465,
                  )}
                </Card>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <Card title={'Top Products'} classTitle={'title-purple'}>
                  {addLoadingChart(
                    <CardProduct data={statisticsHighlights?.topProducts} />,
                    'topProducts',
                    465,
                  )}
                </Card>
              </div>
              <div className="col-12 col-md-6 col-xl-4">
                <Card title={'Top Hashtags'} classTitle={'title-green'}>
                  {addLoadingChart(
                    <CardHashtag data={statisticsHighlights?.topHashtags} />,
                    'topHashtags',
                    465,
                  )}
                </Card>
              </div>
            </div>
          </div> */}
        </div>

        {/* <div className="print-highlight-dashboard">
          <div className="mt-4">
            <Card title="Top Contents" classTitle={'title-blue'}>
              {addLoadingChart(
                <div>
                  <div className={cn(styles.table)}>
                    {statisticsHighlights?.topVideos?.length ? (
                      <div className="row gx-lg-4 gy-lg-5 g-3 mb-md-4 mt-md-2">
                        {statisticsHighlights?.topVideos?.map((item, index) => {
                          return (
                            <Content
                              item={item}
                              key={index}
                              withoutCheckbox
                              setVisibleModalPreview={setVisibleModalPreview}
                              setVideoModalPreview={setVideoModalPreview}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <NoData />
                    )}
                  </div>
                  <ModalPreview
                    visible={visibleModalPreview}
                    onClose={() => setVisibleModalPreview(false)}
                    video={videoModalPreview}
                    title="Preview TikTok"
                  />
                  <Link
                    to="/content/tiktok"
                    target="_blank"
                    className="button-white-grey-border w-100 mt-lg-5 mt-3"
                  >
                    View all
                  </Link>
                </div>,
                'topVideos',
              )}
            </Card>
          </div>
        </div> */}
      </div>
    </>
  );
}
