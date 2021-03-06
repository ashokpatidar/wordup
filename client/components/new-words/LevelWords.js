import React from 'react';
import { connect } from 'react-redux';

import { Container, Grid, Button, Message } from 'semantic-ui-react';

import WordDetailPage from './WordDetail';
import styles from './styles';

/**
 * COMPONENT
 */
class LevelWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleMenuClick(e) {
    this.setState({ activeItem: e.target.value });
  }

  handleBackClick(e) {
    this.setState({ activeItem: '' });
  }

  render() {
    const { userLevelWords } = this.props;

    const selectedWord = this.state.activeItem === '' ?
      null :
      (
        userLevelWords.find(word => word.name === this.state.activeItem)
      );

    let cardKey = 0;
    const suggestionButtons = userLevelWords ?
      userLevelWords.map((word, index) => {
        cardKey += 1;
        return (
          <Grid.Column key={cardKey}>
            <Button
              primary
              value={word.name}
              onClick={this.handleMenuClick}
              size="massive"
              style={styles.levelWords.wordButton}>
              {word.name}
            </Button>
          </Grid.Column>
        );
      }) :
      null;

    return (
      <Container>
        {
          this.state.activeItem === '' ?
            (
              <Container>
                <Message
                  icon="commenting"
                  header="Word suggestions based on your level"
                  content="These are high level words you haven't used."
                  style={styles.levelWords.infoMessage}
                />
                <Grid columns={3} stackable style={styles.levelWords.buttonGroup}>
                  {suggestionButtons}
                </Grid>
              </Container>
            ) :
            (
              <Container>
                <Button
                  secondary
                  onClick={this.handleBackClick}>
                  Back
                </Button>
                <WordDetailPage word={selectedWord} />
              </Container>
            )
        }
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userLevelWords: [...state.userLevelWords],
  };
};

export default connect(mapState)(LevelWords);
