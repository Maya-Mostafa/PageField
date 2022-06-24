import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PageFieldWebPartStrings';
import PageField from './components/PageField';
import { IPageFieldProps } from './components/IPageFieldProps';

export interface IPageFieldWebPartProps {
  fieldName: string;
}

export default class PageFieldWebPart extends BaseClientSideWebPart<IPageFieldWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPageFieldProps> = React.createElement(
      PageField,
      {
        context: this.context,
        fieldName: this.properties.fieldName,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('fieldName', {
                  label: 'Field Name',
                  value: this.properties.fieldName,
                }),
                
              ]
            }
          ]
        }
      ]
    };
  }
}
