import * as React from 'react';
import styles from './PageField.module.scss';
import { IPageFieldProps } from './IPageFieldProps';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {SPHttpClient} from "@microsoft/sp-http";

export default function PageField (props: IPageFieldProps){

  const [fieldValue, setFieldValue] = React.useState('');

  React.useEffect(()=>{
    const getFieldValue = async (fieldName: string) =>{
      const responseUrl = `${props.context.pageContext.web.absoluteUrl}/_api/web/Lists/GetByTitle('Site Pages')/items(33)?$select=${fieldName}`;
      const response = await props.context.spHttpClient.get(responseUrl, SPHttpClient.configurations.v1).then(r => r.json());
      return response;
    };

    const getPgAttachments = async () =>{
      const pageUrl = document.documentURI;
      const pageTitle = pageUrl.substring(pageUrl.lastIndexOf('/')+1, pageUrl.lastIndexOf('.aspx'));

      const responseUrl = `${props.context.pageContext.web.absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('siteassets/sitepages/${pageTitle}')/files`;
      const response = await props.context.spHttpClient.get(responseUrl, SPHttpClient.configurations.v1).then(r => r.json());
      return response;
    };

    getFieldValue(props.fieldName).then(result => setFieldValue(result[props.fieldName]));
    getPgAttachments().then(r=> console.log("attach", r));



  }, []);


  return (
    <div className={ styles.pageField }>
      {props.fieldName} : {fieldValue}
    </div>
  );
}

