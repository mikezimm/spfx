import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { escape } from "@microsoft/sp-lodash-subset";

import styles from "./FoamtreeWebPart.module.scss";
import * as strings from "FoamtreeWebPartStrings";
import { FoamTree } from "@carrotsearch/foamtree";

import { IFoamTree } from './IFoamTree';

export interface IFoamtreeWebPartProps {
  description: string;
}

export default class FoamtreeWebPart extends BaseClientSideWebPart<IFoamtreeWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div id="visualization" style="width: 800px; height: 600px">
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

    let thisFoamTree : IFoamTree = {
      fadeDuration: 1500,
      layoutByWeightOrder: false,
      stacking: 'hierarchical',
      layout: 'ordered',
      dataObject: {
        groups: (function() {
          var arr = [];
          for (var i = 0; i < 80; i++) {
            arr.push({
              label: "a",
              weight: Math.pow(Math.random(), 5) +
                      (Math.random() < 0.1 ? Math.random() * 2 : 0),
            });
          }
          return arr;
        })()
      },
    
      // Show the relaxation
      relaxationVisible: true,
    
      // Make the relaxation last longer
      relaxationQualityThreshold: 0,
      relaxationMaxDuration: 15000,

      groupSelectionOutlineShadowSize: 50,
    
      // For faster rendering
      groupFillType: "plain",
      groupLabelMinFontSize: 20,

      //rolloutStartPoint: 'bottomright',
    };

    foamtree.set(thisFoamTree);
    
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
