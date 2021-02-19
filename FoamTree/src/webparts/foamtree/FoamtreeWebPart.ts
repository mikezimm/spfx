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

export interface IFoamtreeWebPartProps {
  description: string;
}

export default class FoamtreeWebPart extends BaseClientSideWebPart<IFoamtreeWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
      <div id="visualization" style="width: 800px; height: 600px">
      </div>`;

    new FoamTree({
      id: "visualization",
      dataObject: {
        groups: [
          { label: "Your", weight: 1.0 },
          { label: "First", weight: 3.0 },
          { label: "FoamTree", weight: 2.0 },
          { label: "Visualization", weight: 4.0 },
        ],
      },
    });
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
