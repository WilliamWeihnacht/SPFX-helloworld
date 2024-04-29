import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IHelloWorldProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  test1: string;
  test2: boolean;
  test3: string;
  test4: boolean;
  currentSiteUrl: string;
  spHttpClient: SPHttpClient;
  ctx: WebPartContext;
}
