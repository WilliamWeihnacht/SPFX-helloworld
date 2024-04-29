import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

const HelloWorld: React.FC<IHelloWorldProps> = (props) => {
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
      currentSiteUrl,
      spHttpClient
    } = props;

    const [siteLists, setSiteLists] = useState<string[]>([]);

    useEffect(() => {
      (async () => {
        const endpoint: string = `${currentSiteUrl}/_api/web/lists?$select=Title&$filter=Hidden eq false&$orderby=Title&$top=10`;
        const rawResponse: SPHttpClientResponse = await spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
        setSiteLists(
          (await rawResponse.json()).value.map((list: { Title: string }) => {
            return list.Title;
          })
        );
      })();
    });

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
          <ul>
            {
              siteLists.map((list: string) => (
                <li>{list}</li>
              ))
            }
          </ul>
        </div>
      </section>
    );
  }
export default HelloWorld;
