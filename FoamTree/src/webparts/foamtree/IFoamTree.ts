
//https://get.carrotsearch.com/foamtree/demo/api/index.html#data-model 

/**
 * Some tricks:
 * Disappear in animated fashion:  Set dataObject = null and provide pullbackDuration
 */

export type IFoamTreeLayout = 'relaxed' | 'ordered' | 'squarified' ;    // VERIFIED!  https://get.carrotsearch.com/foamtree/demo/api/index.html#layout
export type IFoamTreeFillType = 'none' | 'plain' | 'gradient' ;
export type IFoamTreeStacking = 'hierarchical' | 'flattened';  //https://get.carrotsearch.com/foamtree/demo/api/index.html#stacking

export type IDescriptionGroup = 'auto' | 'always';  //https://get.carrotsearch.com/foamtree/demo/api/index.html#descriptionGroup
export type IDescriptionGroupType = 'stab' | 'floating';  //https://get.carrotsearch.com/foamtree/demo/api/index.html#descriptionGroupType

export type IRelaxationInitializer = 'fisheye' | 'blackhole' | 'ordered' | 'squarified' | 'random' ;  //https://get.carrotsearch.com/foamtree/demo/api/index.html#relaxationInitializer

export type IGroupGrowingEasing = 'linear' | 'bounce' | 'squareIn' | 'squareOut' | 'squareInOut' | 'cubicIn' | 'cubicOut' | 'cubicInOut' | 'quadIn' | 'quadOut' | 'quadInOut' ;  //https://get.carrotsearch.com/foamtree/demo/api/index.html#groupGrowingEasing

export type IRolloutStartPoint = 'center' | 'topleft' | 'bottomright' | 'random' ;  //https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutStartPoint
export type IRolloutMethod = 'groups' | 'individual';  //https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutMethod


export interface IFoamTree {

    dataObject: IFoamTreeDataObject;

    layout: IFoamTreeLayout;  // VERIFIED!  https://get.carrotsearch.com/foamtree/demo/api/index.html#layout

    logging?: boolean;  //Enables logging of some debug information to console.
    stacking?: IFoamTreeStacking;
    layoutByWeightOrder?: boolean;  // VERIFIED!  https://get.carrotsearch.com/foamtree/demo/api/index.html#layoutByWeightOrder

    // Show the relaxation
    relaxationVisible?: boolean; //VERIFIED!   https://get.carrotsearch.com/foamtree/demo/api/index.html#relaxationVisible

    // Make the relaxation last longer
    relaxationQualityThreshold?: number;  //0,  VERIFIED!    https://get.carrotsearch.com/foamtree/demo/api/index.html#relaxationQualityThreshold
    relaxationMaxDuration?: number;  //15000,  VERIFIED!    https://get.carrotsearch.com/foamtree/demo/api/index.html#relaxationMaxDuration

    relaxationInitializer?: IRelaxationInitializer;  //https://get.carrotsearch.com/foamtree/demo/api/index.html#relaxationInitializer

    
    // For faster rendering
    groupFillType?: IFoamTreeFillType;  //"plain"


    maxGroupLevelsDrawn?: number;  //Start with drawing just the top-level groups   https://get.carrotsearch.com/foamtree/demo/api/index.html#maxGroupLevelsDrawn
    maxGroupLabelLevelsDrawn?: number;  //Start with drawing just the top-level groups   https://get.carrotsearch.com/foamtree/demo/api/index.html#maxGroupLabelLevelsDrawn

    descriptionGroup?: IDescriptionGroup;     //https://get.carrotsearch.com/foamtree/demo/api/index.html#descriptionGroup
    descriptionGroupSize?: 0 | 1 ;  //https://get.carrotsearch.com/foamtree/demo/api/index.html#descriptionGroupSize
    descriptionGroupMinHeight?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#descriptionGroupMinHeight
    descriptionGroupMaxHeight?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#descriptionGroupMaxHeight
    descriptionGroupPosition?: number;  // [0,360) https://get.carrotsearch.com/foamtree/demo/api/index.html#descriptionGroupPosition

    descriptionGroupDistanceFromCenter?: 0 | 1 ;     //https://get.carrotsearch.com/foamtree/demo/api/index.html#descriptionGroupDistanceFromCenter
    showZeroWeightGroups?: boolean;        //https://get.carrotsearch.com/foamtree/demo/api/index.html#showZeroWeightGroups

    descriptionGroupPolygonDrawn?: boolean;  //https://get.carrotsearch.com/foamtree/demo/api/index.html#descriptionGroupPolygonDrawn

    // Lower groupMinDiameter to fit as many groups as possible
    groupMinDiameter?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupMinDiameter
    maxGroups?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#maxGroups
    groupGrowingDuration?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupGrowingDuration
    groupGrowingEasing?: IGroupGrowingEasing;  // https://get.carrotsearch.com/foamtree/demo/api/index.html#groupGrowingEasing
    groupGrowingDrag?: number;  // [0,1) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupGrowingDrag
    groupResizingBudget?: number;  // [0,1) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupResizingBudget

    //Group Border
    groupBorderRadius?: number;  // [0,1) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupBorderRadius
    groupBorderWidth?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupBorderWidth
    groupBorderWidthScaling?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupBorderWidthScaling
    groupInsetWidth?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupInsetWidth
    groupBorderRadiusCorrection?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupBorderRadiusCorrection

    //Group Fill
    groupFillGradientRadius?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupFillGradientRadius
    groupFillGradientCenterHueShift?: number;  // [-180,180] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupFillGradientCenterHueShift
    groupFillGradientCenterSaturationShift?: number;  // [-100,100] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupFillGradientCenterSaturationShift
    groupFillGradientCenterLightnessShift?: number;  // [-100,100] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupFillGradientCenterLightnessShift

    groupFillGradientRimHueShift?: number;  // [-180,180] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupFillGradientRimHueShift
    groupFillGradientRimSaturationShift?: number;  // [-100,100] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupFillGradientRimSaturationShift
    groupFillGradientRimLightnessShift?: number;  // [-100,100] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupFillGradientRimLightnessShift

    //Group Stroke
    groupStrokeType?: IFoamTreeFillType;  // https://get.carrotsearch.com/foamtree/demo/api/index.html#groupStrokeType
    groupStrokeWidth?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupStrokeWidth
    groupStrokePlainHueShift?: number;  // [-180,180] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupStrokePlainHueShift
    groupStrokePlainSaturationShift?: number;  // [-100,100] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupStrokePlainSaturationShift

    /**
     * Skipped a bunch here
     */

    //Group Selection
    groupSelectionOutlineColor?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupSelectionOutlineColor
    groupSelectionOutlineWidth?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupSelectionOutlineWidth
    groupSelectionOutlineShadowSize?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupSelectionOutlineShadowSize
    groupSelectionOutlineShadowColor?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupSelectionOutlineShadowColor

    /**
     * Skipped a bunch here
     */

    //Group hover
    groupHoverFillHueShift?: number;  // [-180,180] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupHoverFillHueShift
    groupHoverFillSaturationShift?: number;  // [-100,100] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupHoverFillSaturationShift
    groupHoverFillLightnessShift?: number;  // [-100,100] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupHoverFillLightnessShift


    //Group hover
    groupHoverStrokeHueShift?: number;  // [-180,180] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupHoverStrokeHueShift
    groupHoverStrokeSaturationShift?: number;  // [-100,100] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupHoverStrokeSaturationShift
    groupHoverStrokeLightnessShift?: number;  // [-100,100] https://get.carrotsearch.com/foamtree/demo/api/index.html#groupHoverStrokeLightnessShift

    //Group labels
    groupLabelFontFamily?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupLabelFontFamily
    groupLabelFontStyle?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupLabelFontStyle
    groupLabelFontWeight?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupLabelFontWeight
    groupLabelFontVariant?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupLabelFontVariant
    groupLabelMinFontSize?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#groupLabelMinFontSize

    //Group exposure  The duration of the group opening or closing animation.
    openCloseDuration?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#openCloseDuration


    //Group opening/closing

    //Group hierarchy

    //Group colors
    rainbowStartColor?: string;  // (value is a CSS color)  "hsla(  0, 100%, 50%, 1)"  https://get.carrotsearch.com/foamtree/demo/api/index.html#rainbowStartColor
    rainbowEndColor?: string;  // (value is a CSS color) "hsla(  0, 100%, 50%, 1)"  https://get.carrotsearch.com/foamtree/demo/api/index.html#rainbowEndColor
    rainbowColorDistribution?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#rainbowColorDistribution
    /**
     * Skipped a bunch here
     */

    //Rollout
    rolloutStartPoint?: IRolloutStartPoint;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutStartPoint
    rolloutMethod?: IRolloutMethod;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutMethod

    rolloutDuration?: number;  // [-0,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutDuration
    rolloutEasing?: IGroupGrowingEasing;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutEasing
    rolloutScalingStrength?: number;  // [-infinity,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutScalingStrength
    rolloutTranslationXStrength?: number;  // [-infinity,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutTranslationXStrength
    rolloutTranslationYStrength?: number;  // [-infinity,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutTranslationYStrength
    rolloutRotationStrength?: number;  // [-infinity,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutRotationStrength
    rolloutTransformationCenter?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutTransformationCenter


    rolloutPolygonDrag?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutPolygonDrag
    rolloutPolygonDuration?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutPolygonDuration
    rolloutLabelDelay?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutLabelDelay 

    rolloutLabelDrag?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutLabelDrag
    rolloutLabelDuration?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutLabelDuration
    rolloutChildGroupsDelay?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutChildGroupsDelay 
    rolloutChildGroupsDrag?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#rolloutChildGroupsDrag 


    //Pullback
    pullbackStartPoint?: IRolloutStartPoint;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackStartPoint
    pullbackMethod?: IRolloutMethod;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackMethod

    pullbackDuration?: number;  // [-0,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackDuration
    pullbackEasing?: IGroupGrowingEasing;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackEasing
    pullbackScalingStrength?: number;  // [-infinity,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackScalingStrength
    pullbackTranslationXStrength?: number;  // [-infinity,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackTranslationXStrength
    pullbackTranslationYStrength?: number;  // [-infinity,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackTranslationYStrength
    pullbackRotationStrength?: number;  // [-infinity,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackRotationStrength
    pullbackTransformationCenter?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackTransformationCenter


    pullbackPolygonDrag?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackPolygonDrag
    pullbackPolygonDuration?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackPolygonDuration
    pullbackLabelDelay?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackLabelDelay 

    pullbackLabelDrag?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackLabelDrag
    pullbackLabelDuration?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackLabelDuration
    pullbackChildGroupsDelay?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackChildGroupsDelay 
    pullbackChildGroupsDrag?: number;  // [ 0, 1] https://get.carrotsearch.com/foamtree/demo/api/index.html#pullbackChildGroupsDrag 

    //Fading
    fadeDuration?: number;  // [-0,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#fadeDuration
    fadeEasing?: IGroupGrowingEasing;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#fadeEasing


    //Zoom
    zoomMouseWheelFactor?: number;  // [1,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#zoomMouseWheelFactor
    zoomMouseWheelDuration?: number;  // [-0,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#zoomMouseWheelDuration
    zoomMouseWheelEasing?: IGroupGrowingEasing;  // [-0,infinity] https://get.carrotsearch.com/foamtree/demo/api/index.html#zoomMouseWheelEasing

    //Title bar
    titleBarFontFamily?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarFontFamily
    titleBarFontStyle?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarFontStyle
    titleBarFontWeight?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarFontWeight
    titleBarFontVariant?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarFontVariant
    titleBarMinFontSize?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarMinFontSize
    titleBarMaxFontSize?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarMaxFontSize

    titleBarBackgroundColor?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarBackgroundColor
    titleBarTextColor?: string;  // (value is a CSS color) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarTextColor
    titleBarTextPaddingLeftRight?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarTextPaddingLeftRight
    titleBarTextPaddingTopBottom?: number;  // [0,infinity) https://get.carrotsearch.com/foamtree/demo/api/index.html#titleBarTextPaddingTopBottom

    titleBarDecorator?: any;  // Allows to customize or completely replace the text displayed in the title bar. By default, FoamTree will display the group's label, but you can use this option to display a different text, e.g. some more details related to the group.
    
    /**
     * Skipped a bunch here
     */

    /**
     * Skipped a bunch here
     */

    /**
     * Skipped a bunch here
     */


    /**
     * Skipped a bunch here
     */


}

export interface  IFoamTreeGroup {
    label: string;
    weight: number;
    trigger?: boolean;
    open?: boolean;
    selected?: boolean;
    color?: string;
    groups?: IFoamTreeGroup[];
}

export interface IFoamTreeDataObject {

    id?: string;  //(optional, String) unique identifier of the group. Group identifiers are required only for programmatic changes of certain group attributes such as selection, exposure or open state.
    label?: string;  //(required, String) textual description of the group. For best results, use short labels.  FoamTree will handle the following special unicode characters in the label text:

    /**
     * weight: 
     * (optional, Number >= 0) weight of the group relative to other groups. The larger the weight, the more space the group's polygon will occupy on the screen. 
     * Good values for the weight property could be e.g. the number of documents in a cluster or the score of the cluster.
     * Group weights must be non-negative. Zero-weight groups can receive special treatment, see the showZeroWeightGroups option
     * If a group's weight is not specified, FoamTree will assume the weight is 1.0.
     */
    weight?: number; 

    groups: IFoamTreeGroup[];  //(optional, Array) an array of subgroups of the group.
    open?: boolean;  //(optional, boolean) if true, the group will get open right after the new data is set.

    /**
     * exposed:
     * (optional, boolean) if true, the group will get exposed right after the new data is set. This can be useful to visually highlight a certain group (or groups) as the data is loaded. Please note the limitations when relaxation is visible.
     */
    exposed?: boolean;  
    selected?: boolean;  //ptional, boolean) if true, the group will get selected right after the new data is set.

    /**
     * description:
     * Since 3.4.9 (optional, boolean) If true, descriptionGroup option is set to always and stacking is hierarchical, allocates extra space inside this group to show the group's label together with the group's child groups.
     */
    description?: boolean;

    /**
     * initialPosition:
     * Since 3.4.10 (optional, object) Determines the initial position of this group. The object must contain two properties: position and distanceFromCenter.
     * Please see the attributionPosition and attributionDistanceFromCenter options for semantics of the properties and the Initial positions demo for a complete code example.
     */
    initialPosition?: any;

}