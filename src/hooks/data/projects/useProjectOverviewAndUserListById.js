import { useQuery } from '@tanstack/react-query';
import { getProjectOverview } from '../../../services/api';

const useProjectOverviewAndUserList = (id) => {

    const { data, isSuccess } = useQuery({
        queryKey: ['projects', 'overview', id],
        queryFn: () => {
            return getProjectOverview(id);
            // return true;
        },
        select: (data) => data.data,
    });
    const overview = data?.overview;
    const usersList = data?.users;
    return {
    // // overview tab
    overview: overview,
    usersList: usersList,
    isSuccess,



    // listUsersAndRoles,
    // updateProject,
    // addUserAndRole,
    // editUserAndRole,

    // // parameters tab
    // listParameters,     
    // addParameter,
    // editParameter,
    // deleteParameter,
    // // parameters/stages
    // listStages,         addStage,
    // // parameters/environments
    // listEnvironments,   addEnvironment,
    // // parameters/versions
    // listVersions,       addVersion,

    // // agents tab
    // listAgents,
    // addAgent,
    // editAgent,
    // deleteAgent,

    // // tracking tab
    // getTracking,

    };
};

export default useProjectOverviewAndUserList;
