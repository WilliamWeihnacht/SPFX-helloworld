import * as React from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      test1,
      test2,
      test3,
      test4,
      pageContext
    } = this.props;

    const [lists, setLists] = React.useState([]);

    React.useEffect(() => {
      this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {response.json()})
      .then((data: any) => {setLists(data)});
    },[]);

    return (
      <section className={`${styles.helloWorld} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part description: <strong>{escape(description)}</strong></div>
          <div>Test1: {escape(test1)}</div>
          <div>Test2: {test2 ? "on" : "off"}</div>
          <div>Test3: {escape(test3)}</div>
          <div>Test4: {test4 ? "on" : "off"}</div>
        </div>
        <div>
          <div>Loading From: {escape(pageContext.web.title)}</div>
        </div>
        {lists}
      </section>
    );
  }
}
