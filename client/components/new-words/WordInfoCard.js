import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-router-dom';

import { Card } from 'semantic-ui-react';

/**
 * COMPONENT STYLE
 */
const style = {
};

/**
 * COMPONENT
 */
export const WordInfoCard = props => {
  const { word } = props;
  const { name } = word;

  // const definitionList = definitions.map(def => {
  //   contentKey += 1;
  //   const oneDefList = def.text.split('\n').map(text => {
  //     contentKey += 1;
  //     const dispText = text.split(')').slice(1).join('');
  //     return (<List.Description key={contentKey}>
  //       <List.Icon name="bookmark" />
  //       {dispText}
  //     </List.Description>);
  //   });
  //   return (
  //     <List.Item key={contentKey}>
  //       <List.Header>{def.pos}</List.Header>
  //       {oneDefList}
  //     </List.Item>
  //   );
  // });

  // const exampleList = examples.slice(0, 3).map(example => {
  //   contentKey += 1;
  //   return (
  //     <List.Item key={contentKey}>
  //       <List.Icon name="book" />
  //       {example}
  //     </List.Item>
  //   );
  // });

  return (
    <Card
      style={{ fontSize: 'large' }}
      as={Button}>
      <Card.Content header={name} />
    </Card>
  );
};

export default WordInfoCard;
