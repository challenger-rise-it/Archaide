import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'react-feather';

import { useAuthCtx } from '@context/authContext';

const Home = () => {
  const { goCreateBot, userData, updateProfile, getAuth } = useAuthCtx();
  const navigate = useNavigate();

  /**
   * Handle the creation of a new bot and navigate to the onboarding page
   */
  const handleCreateBot = () => {
    if (userData?._id) {
      const data = {
        email: userData.email,
        onboarding: {
          step: 'bot-form',
          isCompleted: false,
          isSkipped: false,
          isFirst: false,
        },
      };

      updateProfile(data);
      getAuth();
    }

    navigate('/onboarding');
  };

  /**
   * Card header component displaying the title and button
   */
  const renderCardHeader = () => (
    <CardHeader>
      <CardTitle>
        <h2 className="text-capitalize">Community</h2>
      </CardTitle>
      <Button
        className="rounded-pill align-self-center"
        color="primary"
        onClick={handleCreateBot}
      >
        <PlusCircle /> Create A New Bot
      </Button>
    </CardHeader>
  );

  /**
   * Card body component displaying the iframe with community chat
   */
  const renderCardBody = () => (
    <CardBody>
      <iframe
        src="https://e.widgetbot.io/channels/977229858478370866/977229858478370871"
        height="637px"
        width="100%"
        title="Community Chat"
      ></iframe>
    </CardBody>
  );

  return (
    <div>
      <Card>
        {renderCardHeader()}
        {renderCardBody()}
      </Card>
    </div>
  );
};

export default Home;
