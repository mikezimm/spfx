/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { escape } from "@microsoft/sp-lodash-subset";

// 2020-09-08:  Add for dynamic data refiners.
import { IDynamicDataCallables, IDynamicDataPropertyDefinition } from '@microsoft/sp-dynamic-data';

import { sp } from '@pnp/sp';

import { PageContext } from '@microsoft/sp-page-context';

import { FoamTree } from "@carrotsearch/foamtree";

import { IPropertyFieldSite } from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      .d8888. d88888b d8888b. db    db d888888b  .o88b. d88888b .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88'  YP 88'     88  `8D 88    88   `88'   d8P  Y8 88'     88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         `8bo.   88ooooo 88oobY' Y8    8P    88    8P      88ooooo `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88           `Y8b. 88~~~~~ 88`8b   `8b  d8'    88    8b      88~~~~~   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         db   8D 88.     88 `88.  `8bd8'    .88.   Y8b  d8 88.     db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         `8888Y' Y88888P 88   YD    YP    Y888888P  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */

import { propertyPaneBuilder } from '../../services/propPane/PropPaneBuilder';

require('../../services/GrayPropPaneAccordions.css');

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      db   db d88888b db      d8888b. d88888b d8888b. .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88   88 88'     88      88  `8D 88'     88  `8D 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88ooo88 88ooooo 88      88oodD' 88ooooo 88oobY' `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88~~~88 88~~~~~ 88      88~~~   88~~~~~ 88`8b     `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88   88 88.     88booo. 88      88.     88 `88. db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P 88      Y88888P 88   YD `8888Y' 
 *                                                                                                                       
 *                                                                                                                       
 */

import { getFakeFoamTreeData } from './components/FakeFoamTreeData';

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
 *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
 *                                                                                                                                               
 *                                                                                                                                               
 */
import styles from "./FoamtreeWebPart.module.scss";
import * as strings from "FoamtreeWebPartStrings";

/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */


import { IFoamTree, IFoamTreeDataObject } from './IFoamTree';


export interface IFoamtreeWebPartProps {
  description: string;
    // 0 - Context
    pageContext: PageContext;

    // 1 - Analytics options
    useListAnalytics: boolean;
    analyticsWeb?: string;
    analyticsList?: string;
    stressMultiplierTime?: number;
    stressMultiplierProject?: number;
    
    sites: IPropertyFieldSite[];
    lists: string | string[];

    parentListTitle: string;
    parentListName: string;
    parentListWeb: string;
    fetchListFieldTitles: string;

    //dateColumn: string;
    //monthGap: string;

    valueColumn: string;
    valueType: string;
    valueOperator: string;
    minDataDownload: boolean;
    dropDownColumns: string;
    searchColumns: string;
    metaColumns: string;
    enableSearch: boolean;

    webPartScenario: string; //Choice used to create mutiple versions of the webpart.
    showEarlyAccess: boolean;

    //Items copied but not needed from GridCharts
    /* 
    
    cellColor: string;
    yearStyles: string;
    monthStyles: string;
    dayStyles: string;
    cellStyles: string;
    cellhoverInfoColor: string;
    
    otherStyles: string;
    scaleMethod: IScaleMethod;

    squareCustom: string;
    squareColor: string;
    emptyColor: string;
    backGroundColor: string;    

    advancedPivotStyles: boolean;
    pivotSize: string;
    pivotFormat: string;
    pivotOptions: string;
    pivotTab: string;
*/

    fetchCount: number;
    fetchCountMobile: number;
    restFilter: string;

}


/**
 * 2020-09-08:  Add for dynamic data refiners.
 * 
 * was:
 * export default class FoamtreeWebPart extends BaseClientSideWebPart<IFoamtreeWebPartProps> {
 */

export default class FoamtreeWebPart extends BaseClientSideWebPart<IFoamtreeWebPartProps> implements IDynamicDataCallables {

  /**
   * 2020-09-08:  Add for dynamic data refiners.
   */
  private _selectedWebUrl: string;
  private _selectedListName: string;
  private _selectedColumns: string;

  private _foamTreeObject: IFoamTree;  
  private _dataObject: IFoamTreeDataObject;

  //  _foamTreeObject  foamTreeObject
  //  _dataObject  dataObject
  
/***
 *          .d88b.  d8b   db d888888b d8b   db d888888b d888888b 
 *         .8P  Y8. 888o  88   `88'   888o  88   `88'   `~~88~~' 
 *         88    88 88V8o 88    88    88V8o 88    88       88    
 *         88    88 88 V8o88    88    88 V8o88    88       88    
 *         `8b  d8' 88  V888   .88.   88  V888   .88.      88    
 *          `Y88P'  VP   V8P Y888888P VP   V8P Y888888P    YP    
 *                                                               
 *                                                               
 */

    //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
    public onInit():Promise<void> {
      return super.onInit().then(_ => {
        
        //2020-09-08:  Add for dynamic data refiners.
        this.context.dynamicDataSourceManager.initializeSource(this);

        // other init code may be present

        let mess = 'onInit - ONINIT: ' + new Date().toLocaleTimeString();

        console.log(mess);

        //https://stackoverflow.com/questions/52010321/sharepoint-online-full-width-page
        if ( window.location.href &&  
          window.location.href.toLowerCase().indexOf("layouts/15/workbench.aspx") > 0 ) {
            
          if (document.getElementById("workbenchPageContent")) {
            document.getElementById("workbenchPageContent").style.maxWidth = "none";
          }
        } 

        //console.log('window.location',window.location);
        sp.setup({
          spfxContext: this.context
        });
      });
    }
  

    /**
     * 2020-09-08:  Add for dynamic data refiners.   public getPropertyDefinitions():
     * 
     */
    public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition>{
      return [
        {
          id: 'selectedWebUrl',
          title: 'Field you are filtering on',
        },
        {
          id: 'selectedListName',
          title: 'Value you are filtering on',
        },
        {
          id: 'selectedColumns',
          title: 'Filter by refiner component',
        },
        {
          id: 'foamTreeObject',
          title: 'Filter by refiner component',
        },
        {
          id: 'dataObject',
          title: 'Filter by refiner component',
        }
      ];
    }


    /**
     * 2020-09-08:  Add for dynamic data refiners.   public getPropertyValue:
     * @param propertyId 
     */
    public getPropertyValue(propertyId: string): string | IFoamTreeDataObject | IFoamTree {
      switch(propertyId) {
        case 'selectedWebUrl': 
          return this._selectedWebUrl;
        case 'selectedListName':
          return this._selectedListName;
        case 'selectedColumns':
          return this._selectedColumns;
        case 'foamTreeObject':
          return this._foamTreeObject;
        case 'dataObject':
          return this._dataObject;
      }
      throw new Error('Bad property ID');
    
    }

  public render(): void {

    /*      <div id="visualization" style="width: 800px; height: 600px">
      </div>`;
    */

    let WebpartHeight = this.domElement.getBoundingClientRect().height > 0 ? this.domElement.getBoundingClientRect().height : 600;
    let WebpartWidth =  this.domElement.getBoundingClientRect().width > 0 ? this.domElement.getBoundingClientRect().width : 100;

    this.domElement.innerHTML = `
      <div id="visualization" style="width: ${ WebpartWidth }px; height: ${ WebpartHeight }px">
      </div>`;

    let foamtree = new FoamTree({
      id: "visualization",
      dataObject: {
        groups: [
          /*
          { label: "Your", weight: 1.0 },
          { label: "First", weight: 3.0 },
          { label: "FoamTree", weight: 2.0 },
          { label: "Visualization", weight: 4.0 },
          { label: "BM", weight: 8.0 },
          { label: "BK", weight: 2.0 },
          { label: "TTP", weight: 3.5 },
          */
          { label: "Bad news", open: true, groups: [
            { label: "Last penny lost", sentiment: -0.5 },
            { label: "Bazinga doomed",  sentiment: -1 }
            ]},
          { label: "Good news", exposed: true, selected: true, groups: [
            { label: "iPads under $100",      sentiment: 0.5, selected: true },
            { label: "Martians are friendly", sentiment: 1 }
            ]},
          { label: "Other news", groups: [
            { label: "Vampires on the loose",     sentiment: -2 },
            { label: "Van Helsing to the rescue", sentiment: -3 }
            ]}
        ],
      },
    });

    let thisFoamTree : IFoamTree = getFakeFoamTreeData();

    foamtree.set(thisFoamTree);
    
  }


  /**
   * 2020-09-08:  Add for dynamic data refiners.   private handleFieldSelected:
   * @param field 
   */

/*
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
*/

  private async UpdateTitles(): Promise<boolean> {

    let listName = this.properties.parentListTitle ? this.properties.parentListTitle : 'ParentListTitle';
    const list = sp.web.lists.getByTitle(listName);
    const r = await list.fields();

    //2020-05-13:  Remove Active since it's replaced with StatusTMT which is not applicable here
    let defFields = ["Title","Author","Editor","Created","Modified"];
    let filterFields=["SSChoice1","SSChoiceA","MSChoice2","MSChoiceB"];
    let allFields = defFields.concat(filterFields);

    let fieldTitles = r.filter(f => f.Hidden !== true && allFields.indexOf(f.StaticName) > -1).map( 
      f => {return [f.StaticName,f.Title,f.Description,f.Required,f.FieldTypeKind];});
    
    //Update properties here:
    this.properties.fetchListFieldTitles = JSON.stringify(fieldTitles);

    console.log('list fields: ', r);
    console.log('fieldTitles: ', fieldTitles);
    
    return true;

  } 


  /***
  *         d8888b. d8888b.  .d88b.  d8888b.      d8888b.  .d8b.  d8b   db d88888b 
  *         88  `8D 88  `8D .8P  Y8. 88  `8D      88  `8D d8' `8b 888o  88 88'     
  *         88oodD' 88oobY' 88    88 88oodD'      88oodD' 88ooo88 88V8o 88 88ooooo 
  *         88~~~   88`8b   88    88 88~~~        88~~~   88~~~88 88 V8o88 88~~~~~ 
  *         88      88 `88. `8b  d8' 88           88      88   88 88  V888 88.     
  *         88      88   YD  `Y88P'  88           88      YP   YP VP   V8P Y88888P 
  *                                                                                
  *                                                                                
  */

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return propertyPaneBuilder.getPropertyPaneConfiguration(
      this.properties,
      this.context,
      this.onPropertyPaneFieldChanged.bind(this),
      //this.CreateTTIMTimeList.bind(this),
      //this.CreateTTIMProjectList.bind(this),
      //this.UpdateTitles.bind(this),

      );
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {

    /**
     * This section is used to determine when to refresh the pane options
     */
    let updateOnThese = [
      'setSize','setTab','otherTab','setTab','otherTab','setTab','otherTab','setTab','otherTab', '',
      'stressMultiplierTime', 'webPartScenario', '', '', '',
      'parentListTitle', 'parentListName', 'parentListWeb', 'sites', 'lists',
      'dateColumn', 'valueColumn', 'valueType', 'valueOperator', 'minDataDownload','dropDownColumns','searchColumns', 'metaColumns',
      'pivotSize', 'pivotFormat', 'pivotOptions', 'pivotTab', 'advancedPivotStyles', 'scaleMethod',
      'fetchCount', 'fetchCountMobile', 'restFilter', '', '', '',
      'centerPaneFields','centerPaneStyles',
      'monthGap', 'squareColor', 'emptyColor', 'backGroundColor', 'squareCustom', 
    ];
    //alert('props updated');
    console.log('onPropertyPaneFieldChanged:', propertyPath, oldValue, newValue);
    if (updateOnThese.indexOf(propertyPath) > -1 ) {
      this.properties[propertyPath] = newValue;   
      this.context.propertyPane.refresh();

    } else { //This can be removed if it works

    }
    this.render();
  }



}
