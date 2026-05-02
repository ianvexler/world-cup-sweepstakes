import { useEffect, useState } from "react";
import Standings from "../../components/home/Standings";
import Layout from "../../components/ui/Layout";
import Tabs from "../../components/ui/Tabs";
import { Match } from "../../../types";
import getMatches from "../../api/requests/matches/getMatches";
import Loader from "../../components/ui/Loader";
import classNames from "classnames";
import MatchEntry from "../../components/matches/MatchEntry";

const tabs = ['League', 'Knockouts'] as const;
type LeagueTab = (typeof tabs)[number];

const League = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState<LeagueTab>('League');

  const [standingsLoading, setStandingsLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(true);

  useEffect(() => {
    setMatchesLoading(true);

    getMatches()
      .then((data) => {
        setMatches(data);
      })
      .finally(() => {
        setMatchesLoading(false);
      });
  }, []);

  const isLoading = standingsLoading || matchesLoading;
  
  return (
    <Layout title="League Phase">
      {isLoading ? (
        <Loader size={40} />
      ) : null}

      <div className={classNames("grid grid-cols-2 gap-4 w-full", isLoading ? "hidden" : "")}>
        <div className="text-sm text-muted">
          {matches.length === 0 ? (
            <div className="text-sm text-muted">
              No matches found
            </div>
          ) : (
            <div className="text-sm text-muted flex flex-col gap-2">
              {matches.map((match) => (
                <MatchEntry key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>

        <div>
          <Tabs 
            tabs={[...tabs]} 
            activeTab={activeTab} 
            onChange={setActiveTab} 
            className="mb-2"
          />
          
          {activeTab === 'League' && (
            <Standings loading={standingsLoading} setLoading={setStandingsLoading} />
          )}
          {activeTab === 'Knockouts' && (
            <div className="text-sm text-muted">Knockouts coming soon.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default League;