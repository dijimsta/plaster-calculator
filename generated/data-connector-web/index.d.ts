import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AccountContact_Key {
  id: UUIDString;
  __typename?: 'AccountContact_Key';
}

export interface Account_Key {
  id: UUIDString;
  __typename?: 'Account_Key';
}

export interface ApplyQuestionnaireTemplateToProjectData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
}

export interface ApplyQuestionnaireTemplateToProjectVariables {
  projectId: UUIDString;
  sourceTemplateId: UUIDString;
}

export interface AssignQuoteTemplateToCompanyData {
  company_update?: Company_Key | null;
}

export interface AssignQuoteTemplateToCompanyVariables {
  companyId: UUIDString;
  quoteTemplateId: UUIDString;
}

export interface BatchApplyQuestionnaireTemplateToProjectData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
  question1: ProjectQuestionnaireQuestion_Key;
  question2: ProjectQuestionnaireQuestion_Key;
  question3: ProjectQuestionnaireQuestion_Key;
  question4: ProjectQuestionnaireQuestion_Key;
  question5: ProjectQuestionnaireQuestion_Key;
  question6: ProjectQuestionnaireQuestion_Key;
  question7: ProjectQuestionnaireQuestion_Key;
  question8: ProjectQuestionnaireQuestion_Key;
  question9: ProjectQuestionnaireQuestion_Key;
  question10: ProjectQuestionnaireQuestion_Key;
  question11: ProjectQuestionnaireQuestion_Key;
  question12: ProjectQuestionnaireQuestion_Key;
  question13: ProjectQuestionnaireQuestion_Key;
  question14: ProjectQuestionnaireQuestion_Key;
  question15: ProjectQuestionnaireQuestion_Key;
  question16: ProjectQuestionnaireQuestion_Key;
  question17: ProjectQuestionnaireQuestion_Key;
  question18: ProjectQuestionnaireQuestion_Key;
  question19: ProjectQuestionnaireQuestion_Key;
  question20: ProjectQuestionnaireQuestion_Key;
}

export interface BatchApplyQuestionnaireTemplateToProjectVariables {
  projectId: UUIDString;
  sourceTemplateId: UUIDString;
  includeQuestion1?: boolean | null;
  question1Label?: string | null;
  question1Position?: number | null;
  includeQuestion2?: boolean | null;
  question2Label?: string | null;
  question2Position?: number | null;
  includeQuestion3?: boolean | null;
  question3Label?: string | null;
  question3Position?: number | null;
  includeQuestion4?: boolean | null;
  question4Label?: string | null;
  question4Position?: number | null;
  includeQuestion5?: boolean | null;
  question5Label?: string | null;
  question5Position?: number | null;
  includeQuestion6?: boolean | null;
  question6Label?: string | null;
  question6Position?: number | null;
  includeQuestion7?: boolean | null;
  question7Label?: string | null;
  question7Position?: number | null;
  includeQuestion8?: boolean | null;
  question8Label?: string | null;
  question8Position?: number | null;
  includeQuestion9?: boolean | null;
  question9Label?: string | null;
  question9Position?: number | null;
  includeQuestion10?: boolean | null;
  question10Label?: string | null;
  question10Position?: number | null;
  includeQuestion11?: boolean | null;
  question11Label?: string | null;
  question11Position?: number | null;
  includeQuestion12?: boolean | null;
  question12Label?: string | null;
  question12Position?: number | null;
  includeQuestion13?: boolean | null;
  question13Label?: string | null;
  question13Position?: number | null;
  includeQuestion14?: boolean | null;
  question14Label?: string | null;
  question14Position?: number | null;
  includeQuestion15?: boolean | null;
  question15Label?: string | null;
  question15Position?: number | null;
  includeQuestion16?: boolean | null;
  question16Label?: string | null;
  question16Position?: number | null;
  includeQuestion17?: boolean | null;
  question17Label?: string | null;
  question17Position?: number | null;
  includeQuestion18?: boolean | null;
  question18Label?: string | null;
  question18Position?: number | null;
  includeQuestion19?: boolean | null;
  question19Label?: string | null;
  question19Position?: number | null;
  includeQuestion20?: boolean | null;
  question20Label?: string | null;
  question20Position?: number | null;
}

export interface ClearCompanyQuoteTemplateData {
  company_update?: Company_Key | null;
}

export interface ClearCompanyQuoteTemplateVariables {
  companyId: UUIDString;
}

export interface ClearMyCompanyPrimaryContactData {
  company_update?: Company_Key | null;
}

export interface ClearMyCompanyPrimaryContactVariables {
  companyId: UUIDString;
}

export interface CompanyContact_Key {
  id: UUIDString;
  __typename?: 'CompanyContact_Key';
}

export interface Company_Key {
  id: UUIDString;
  __typename?: 'Company_Key';
}

export interface CreateMyCompanyContactData {
  companyContact_insert: CompanyContact_Key;
}

export interface CreateMyCompanyContactVariables {
  id: UUIDString;
  companyId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface CreateMyCompanyData {
  company_insert: Company_Key;
}

export interface CreateMyCompanyVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}

export interface CreateProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_insert: ProjectQuestionnaireQuestion_Key;
}

export interface CreateProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
  label: string;
  position: number;
}

export interface CreateQuestionnaireTemplateData {
  questionnaireTemplate_insert: QuestionnaireTemplate_Key;
}

export interface CreateQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_insert: QuestionnaireTemplateQuestion_Key;
}

export interface CreateQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
  label: string;
  position: number;
}

export interface CreateQuestionnaireTemplateVariables {
  id: UUIDString;
  name: string;
}

export interface CreateQuoteItemTemplateConfigData {
  quoteItemTemplateConfig_insert: QuoteItemTemplateConfig_Key;
}

export interface CreateQuoteItemTemplateConfigVariables {
  quoteTemplateId: UUIDString;
  itemTemplateId: UUIDString;
  unitPriceCents: number;
  materialUnitPriceCents: number;
  labourUnitPriceCents: number;
}

export interface CreateQuoteItemTemplateWithUnitData {
  quoteItemTemplate_insert: QuoteItemTemplate_Key;
}

export interface CreateQuoteItemTemplateWithUnitVariables {
  id: UUIDString;
  name: string;
  unit: string;
  hasKeywords: boolean;
  keywords: string[];
}

export interface CreateQuoteItemWithUnitData {
  quoteItem_insert: QuoteItem_Key;
}

export interface CreateQuoteItemWithUnitVariables {
  id: UUIDString;
  quoteId: UUIDString;
  displayOrder: number;
  name: string;
  quantity: number;
  unit: string;
  unitPriceCents: number;
}

export interface CreateQuoteTemplateData {
  quoteTemplate_insert: QuoteTemplate_Key;
}

export interface CreateQuoteTemplateVariables {
  id: UUIDString;
  name: string;
}

export interface CreateQuoteTemplateVariationData {
  quoteTemplate_insert: QuoteTemplate_Key;
  item1: QuoteItemTemplateConfig_Key;
  item2: QuoteItemTemplateConfig_Key;
  item3: QuoteItemTemplateConfig_Key;
  item4: QuoteItemTemplateConfig_Key;
  item5: QuoteItemTemplateConfig_Key;
  item6: QuoteItemTemplateConfig_Key;
  item7: QuoteItemTemplateConfig_Key;
  item8: QuoteItemTemplateConfig_Key;
  item9: QuoteItemTemplateConfig_Key;
  item10: QuoteItemTemplateConfig_Key;
  item11: QuoteItemTemplateConfig_Key;
  item12: QuoteItemTemplateConfig_Key;
  item13: QuoteItemTemplateConfig_Key;
  item14: QuoteItemTemplateConfig_Key;
  item15: QuoteItemTemplateConfig_Key;
  item16: QuoteItemTemplateConfig_Key;
  item17: QuoteItemTemplateConfig_Key;
  item18: QuoteItemTemplateConfig_Key;
  item19: QuoteItemTemplateConfig_Key;
  item20: QuoteItemTemplateConfig_Key;
}

export interface CreateQuoteTemplateVariationVariables {
  quoteTemplateId: UUIDString;
  name: string;
  includeItem1?: boolean | null;
  item1ItemTemplateId?: UUIDString | null;
  item1Enabled?: boolean | null;
  item1UnitPriceCents?: number | null;
  item1MaterialUnitPriceCents?: number | null;
  item1LabourUnitPriceCents?: number | null;
  includeItem2?: boolean | null;
  item2ItemTemplateId?: UUIDString | null;
  item2Enabled?: boolean | null;
  item2UnitPriceCents?: number | null;
  item2MaterialUnitPriceCents?: number | null;
  item2LabourUnitPriceCents?: number | null;
  includeItem3?: boolean | null;
  item3ItemTemplateId?: UUIDString | null;
  item3Enabled?: boolean | null;
  item3UnitPriceCents?: number | null;
  item3MaterialUnitPriceCents?: number | null;
  item3LabourUnitPriceCents?: number | null;
  includeItem4?: boolean | null;
  item4ItemTemplateId?: UUIDString | null;
  item4Enabled?: boolean | null;
  item4UnitPriceCents?: number | null;
  item4MaterialUnitPriceCents?: number | null;
  item4LabourUnitPriceCents?: number | null;
  includeItem5?: boolean | null;
  item5ItemTemplateId?: UUIDString | null;
  item5Enabled?: boolean | null;
  item5UnitPriceCents?: number | null;
  item5MaterialUnitPriceCents?: number | null;
  item5LabourUnitPriceCents?: number | null;
  includeItem6?: boolean | null;
  item6ItemTemplateId?: UUIDString | null;
  item6Enabled?: boolean | null;
  item6UnitPriceCents?: number | null;
  item6MaterialUnitPriceCents?: number | null;
  item6LabourUnitPriceCents?: number | null;
  includeItem7?: boolean | null;
  item7ItemTemplateId?: UUIDString | null;
  item7Enabled?: boolean | null;
  item7UnitPriceCents?: number | null;
  item7MaterialUnitPriceCents?: number | null;
  item7LabourUnitPriceCents?: number | null;
  includeItem8?: boolean | null;
  item8ItemTemplateId?: UUIDString | null;
  item8Enabled?: boolean | null;
  item8UnitPriceCents?: number | null;
  item8MaterialUnitPriceCents?: number | null;
  item8LabourUnitPriceCents?: number | null;
  includeItem9?: boolean | null;
  item9ItemTemplateId?: UUIDString | null;
  item9Enabled?: boolean | null;
  item9UnitPriceCents?: number | null;
  item9MaterialUnitPriceCents?: number | null;
  item9LabourUnitPriceCents?: number | null;
  includeItem10?: boolean | null;
  item10ItemTemplateId?: UUIDString | null;
  item10Enabled?: boolean | null;
  item10UnitPriceCents?: number | null;
  item10MaterialUnitPriceCents?: number | null;
  item10LabourUnitPriceCents?: number | null;
  includeItem11?: boolean | null;
  item11ItemTemplateId?: UUIDString | null;
  item11Enabled?: boolean | null;
  item11UnitPriceCents?: number | null;
  item11MaterialUnitPriceCents?: number | null;
  item11LabourUnitPriceCents?: number | null;
  includeItem12?: boolean | null;
  item12ItemTemplateId?: UUIDString | null;
  item12Enabled?: boolean | null;
  item12UnitPriceCents?: number | null;
  item12MaterialUnitPriceCents?: number | null;
  item12LabourUnitPriceCents?: number | null;
  includeItem13?: boolean | null;
  item13ItemTemplateId?: UUIDString | null;
  item13Enabled?: boolean | null;
  item13UnitPriceCents?: number | null;
  item13MaterialUnitPriceCents?: number | null;
  item13LabourUnitPriceCents?: number | null;
  includeItem14?: boolean | null;
  item14ItemTemplateId?: UUIDString | null;
  item14Enabled?: boolean | null;
  item14UnitPriceCents?: number | null;
  item14MaterialUnitPriceCents?: number | null;
  item14LabourUnitPriceCents?: number | null;
  includeItem15?: boolean | null;
  item15ItemTemplateId?: UUIDString | null;
  item15Enabled?: boolean | null;
  item15UnitPriceCents?: number | null;
  item15MaterialUnitPriceCents?: number | null;
  item15LabourUnitPriceCents?: number | null;
  includeItem16?: boolean | null;
  item16ItemTemplateId?: UUIDString | null;
  item16Enabled?: boolean | null;
  item16UnitPriceCents?: number | null;
  item16MaterialUnitPriceCents?: number | null;
  item16LabourUnitPriceCents?: number | null;
  includeItem17?: boolean | null;
  item17ItemTemplateId?: UUIDString | null;
  item17Enabled?: boolean | null;
  item17UnitPriceCents?: number | null;
  item17MaterialUnitPriceCents?: number | null;
  item17LabourUnitPriceCents?: number | null;
  includeItem18?: boolean | null;
  item18ItemTemplateId?: UUIDString | null;
  item18Enabled?: boolean | null;
  item18UnitPriceCents?: number | null;
  item18MaterialUnitPriceCents?: number | null;
  item18LabourUnitPriceCents?: number | null;
  includeItem19?: boolean | null;
  item19ItemTemplateId?: UUIDString | null;
  item19Enabled?: boolean | null;
  item19UnitPriceCents?: number | null;
  item19MaterialUnitPriceCents?: number | null;
  item19LabourUnitPriceCents?: number | null;
  includeItem20?: boolean | null;
  item20ItemTemplateId?: UUIDString | null;
  item20Enabled?: boolean | null;
  item20UnitPriceCents?: number | null;
  item20MaterialUnitPriceCents?: number | null;
  item20LabourUnitPriceCents?: number | null;
}

export interface CreateQuoteWithItemsData {
  quoteItem_deleteMany: number;
  quote_deleteMany: number;
  quote_insert: Quote_Key;
  item1: QuoteItem_Key;
  item2: QuoteItem_Key;
  item3: QuoteItem_Key;
  item4: QuoteItem_Key;
  item5: QuoteItem_Key;
  item6: QuoteItem_Key;
  item7: QuoteItem_Key;
  item8: QuoteItem_Key;
  item9: QuoteItem_Key;
  item10: QuoteItem_Key;
  item11: QuoteItem_Key;
  item12: QuoteItem_Key;
  item13: QuoteItem_Key;
  item14: QuoteItem_Key;
  item15: QuoteItem_Key;
  item16: QuoteItem_Key;
  item17: QuoteItem_Key;
  item18: QuoteItem_Key;
  item19: QuoteItem_Key;
  item20: QuoteItem_Key;
}

export interface CreateQuoteWithItemsVariables {
  projectId: UUIDString;
  quoteId: UUIDString;
  includeItem1?: boolean | null;
  item1Name?: string | null;
  item1DisplayOrder?: number | null;
  item1Quantity?: number | null;
  item1Unit?: string | null;
  item1SourceTemplateId?: UUIDString | null;
  item1QuantitySourceId?: UUIDString | null;
  item1UnitPriceCents?: number | null;
  item1MaterialUnitPriceCents?: number | null;
  item1LabourUnitPriceCents?: number | null;
  item1MatchedKeywords?: string[];
  includeItem2?: boolean | null;
  item2Name?: string | null;
  item2DisplayOrder?: number | null;
  item2Quantity?: number | null;
  item2Unit?: string | null;
  item2SourceTemplateId?: UUIDString | null;
  item2QuantitySourceId?: UUIDString | null;
  item2UnitPriceCents?: number | null;
  item2MaterialUnitPriceCents?: number | null;
  item2LabourUnitPriceCents?: number | null;
  item2MatchedKeywords?: string[];
  includeItem3?: boolean | null;
  item3Name?: string | null;
  item3DisplayOrder?: number | null;
  item3Quantity?: number | null;
  item3Unit?: string | null;
  item3SourceTemplateId?: UUIDString | null;
  item3QuantitySourceId?: UUIDString | null;
  item3UnitPriceCents?: number | null;
  item3MaterialUnitPriceCents?: number | null;
  item3LabourUnitPriceCents?: number | null;
  item3MatchedKeywords?: string[];
  includeItem4?: boolean | null;
  item4Name?: string | null;
  item4DisplayOrder?: number | null;
  item4Quantity?: number | null;
  item4Unit?: string | null;
  item4SourceTemplateId?: UUIDString | null;
  item4QuantitySourceId?: UUIDString | null;
  item4UnitPriceCents?: number | null;
  item4MaterialUnitPriceCents?: number | null;
  item4LabourUnitPriceCents?: number | null;
  item4MatchedKeywords?: string[];
  includeItem5?: boolean | null;
  item5Name?: string | null;
  item5DisplayOrder?: number | null;
  item5Quantity?: number | null;
  item5Unit?: string | null;
  item5SourceTemplateId?: UUIDString | null;
  item5QuantitySourceId?: UUIDString | null;
  item5UnitPriceCents?: number | null;
  item5MaterialUnitPriceCents?: number | null;
  item5LabourUnitPriceCents?: number | null;
  item5MatchedKeywords?: string[];
  includeItem6?: boolean | null;
  item6Name?: string | null;
  item6DisplayOrder?: number | null;
  item6Quantity?: number | null;
  item6Unit?: string | null;
  item6SourceTemplateId?: UUIDString | null;
  item6QuantitySourceId?: UUIDString | null;
  item6UnitPriceCents?: number | null;
  item6MaterialUnitPriceCents?: number | null;
  item6LabourUnitPriceCents?: number | null;
  item6MatchedKeywords?: string[];
  includeItem7?: boolean | null;
  item7Name?: string | null;
  item7DisplayOrder?: number | null;
  item7Quantity?: number | null;
  item7Unit?: string | null;
  item7SourceTemplateId?: UUIDString | null;
  item7QuantitySourceId?: UUIDString | null;
  item7UnitPriceCents?: number | null;
  item7MaterialUnitPriceCents?: number | null;
  item7LabourUnitPriceCents?: number | null;
  item7MatchedKeywords?: string[];
  includeItem8?: boolean | null;
  item8Name?: string | null;
  item8DisplayOrder?: number | null;
  item8Quantity?: number | null;
  item8Unit?: string | null;
  item8SourceTemplateId?: UUIDString | null;
  item8QuantitySourceId?: UUIDString | null;
  item8UnitPriceCents?: number | null;
  item8MaterialUnitPriceCents?: number | null;
  item8LabourUnitPriceCents?: number | null;
  item8MatchedKeywords?: string[];
  includeItem9?: boolean | null;
  item9Name?: string | null;
  item9DisplayOrder?: number | null;
  item9Quantity?: number | null;
  item9Unit?: string | null;
  item9SourceTemplateId?: UUIDString | null;
  item9QuantitySourceId?: UUIDString | null;
  item9UnitPriceCents?: number | null;
  item9MaterialUnitPriceCents?: number | null;
  item9LabourUnitPriceCents?: number | null;
  item9MatchedKeywords?: string[];
  includeItem10?: boolean | null;
  item10Name?: string | null;
  item10DisplayOrder?: number | null;
  item10Quantity?: number | null;
  item10Unit?: string | null;
  item10SourceTemplateId?: UUIDString | null;
  item10QuantitySourceId?: UUIDString | null;
  item10UnitPriceCents?: number | null;
  item10MaterialUnitPriceCents?: number | null;
  item10LabourUnitPriceCents?: number | null;
  item10MatchedKeywords?: string[];
  includeItem11?: boolean | null;
  item11Name?: string | null;
  item11DisplayOrder?: number | null;
  item11Quantity?: number | null;
  item11Unit?: string | null;
  item11SourceTemplateId?: UUIDString | null;
  item11QuantitySourceId?: UUIDString | null;
  item11UnitPriceCents?: number | null;
  item11MaterialUnitPriceCents?: number | null;
  item11LabourUnitPriceCents?: number | null;
  item11MatchedKeywords?: string[];
  includeItem12?: boolean | null;
  item12Name?: string | null;
  item12DisplayOrder?: number | null;
  item12Quantity?: number | null;
  item12Unit?: string | null;
  item12SourceTemplateId?: UUIDString | null;
  item12QuantitySourceId?: UUIDString | null;
  item12UnitPriceCents?: number | null;
  item12MaterialUnitPriceCents?: number | null;
  item12LabourUnitPriceCents?: number | null;
  item12MatchedKeywords?: string[];
  includeItem13?: boolean | null;
  item13Name?: string | null;
  item13DisplayOrder?: number | null;
  item13Quantity?: number | null;
  item13Unit?: string | null;
  item13SourceTemplateId?: UUIDString | null;
  item13QuantitySourceId?: UUIDString | null;
  item13UnitPriceCents?: number | null;
  item13MaterialUnitPriceCents?: number | null;
  item13LabourUnitPriceCents?: number | null;
  item13MatchedKeywords?: string[];
  includeItem14?: boolean | null;
  item14Name?: string | null;
  item14DisplayOrder?: number | null;
  item14Quantity?: number | null;
  item14Unit?: string | null;
  item14SourceTemplateId?: UUIDString | null;
  item14QuantitySourceId?: UUIDString | null;
  item14UnitPriceCents?: number | null;
  item14MaterialUnitPriceCents?: number | null;
  item14LabourUnitPriceCents?: number | null;
  item14MatchedKeywords?: string[];
  includeItem15?: boolean | null;
  item15Name?: string | null;
  item15DisplayOrder?: number | null;
  item15Quantity?: number | null;
  item15Unit?: string | null;
  item15SourceTemplateId?: UUIDString | null;
  item15QuantitySourceId?: UUIDString | null;
  item15UnitPriceCents?: number | null;
  item15MaterialUnitPriceCents?: number | null;
  item15LabourUnitPriceCents?: number | null;
  item15MatchedKeywords?: string[];
  includeItem16?: boolean | null;
  item16Name?: string | null;
  item16DisplayOrder?: number | null;
  item16Quantity?: number | null;
  item16Unit?: string | null;
  item16SourceTemplateId?: UUIDString | null;
  item16QuantitySourceId?: UUIDString | null;
  item16UnitPriceCents?: number | null;
  item16MaterialUnitPriceCents?: number | null;
  item16LabourUnitPriceCents?: number | null;
  item16MatchedKeywords?: string[];
  includeItem17?: boolean | null;
  item17Name?: string | null;
  item17DisplayOrder?: number | null;
  item17Quantity?: number | null;
  item17Unit?: string | null;
  item17SourceTemplateId?: UUIDString | null;
  item17QuantitySourceId?: UUIDString | null;
  item17UnitPriceCents?: number | null;
  item17MaterialUnitPriceCents?: number | null;
  item17LabourUnitPriceCents?: number | null;
  item17MatchedKeywords?: string[];
  includeItem18?: boolean | null;
  item18Name?: string | null;
  item18DisplayOrder?: number | null;
  item18Quantity?: number | null;
  item18Unit?: string | null;
  item18SourceTemplateId?: UUIDString | null;
  item18QuantitySourceId?: UUIDString | null;
  item18UnitPriceCents?: number | null;
  item18MaterialUnitPriceCents?: number | null;
  item18LabourUnitPriceCents?: number | null;
  item18MatchedKeywords?: string[];
  includeItem19?: boolean | null;
  item19Name?: string | null;
  item19DisplayOrder?: number | null;
  item19Quantity?: number | null;
  item19Unit?: string | null;
  item19SourceTemplateId?: UUIDString | null;
  item19QuantitySourceId?: UUIDString | null;
  item19UnitPriceCents?: number | null;
  item19MaterialUnitPriceCents?: number | null;
  item19LabourUnitPriceCents?: number | null;
  item19MatchedKeywords?: string[];
  includeItem20?: boolean | null;
  item20Name?: string | null;
  item20DisplayOrder?: number | null;
  item20Quantity?: number | null;
  item20Unit?: string | null;
  item20SourceTemplateId?: UUIDString | null;
  item20QuantitySourceId?: UUIDString | null;
  item20UnitPriceCents?: number | null;
  item20MaterialUnitPriceCents?: number | null;
  item20LabourUnitPriceCents?: number | null;
  item20MatchedKeywords?: string[];
}

export interface DeleteMyCompanyContactData {
  company_update?: Company_Key | null;
  companyContact_delete?: CompanyContact_Key | null;
}

export interface DeleteMyCompanyContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
}

export interface DeleteMyCompanyData {
  companyContact_deleteMany: number;
  company_delete?: Company_Key | null;
}

export interface DeleteMyCompanyVariables {
  id: UUIDString;
}

export interface DeleteProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_delete?: ProjectQuestionnaireQuestion_Key | null;
}

export interface DeleteProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
}

export interface DeleteQuestionnaireTemplateData {
  questionnaireTemplateQuestion_deleteMany: number;
  questionnaireTemplate_delete?: QuestionnaireTemplate_Key | null;
}

export interface DeleteQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_delete?: QuestionnaireTemplateQuestion_Key | null;
}

export interface DeleteQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
}

export interface DeleteQuestionnaireTemplateVariables {
  id: UUIDString;
}

export interface DeleteQuoteItemData {
  quoteItem_delete?: QuoteItem_Key | null;
}

export interface DeleteQuoteItemTemplateData {
  quoteItemTemplateConfig_deleteMany: number;
  quoteItemTemplate_delete?: QuoteItemTemplate_Key | null;
}

export interface DeleteQuoteItemTemplateVariables {
  id: UUIDString;
}

export interface DeleteQuoteItemVariables {
  id: UUIDString;
}

export interface DeleteQuoteTemplateData {
  company_updateMany: number;
  quoteItemTemplateConfig_deleteMany: number;
  quoteTemplate_delete?: QuoteTemplate_Key | null;
}

export interface DeleteQuoteTemplateVariables {
  id: UUIDString;
}

export interface EnsureProjectQuestionnaireData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
}

export interface EnsureProjectQuestionnaireVariables {
  projectId: UUIDString;
}

export interface FloorplanPage_Key {
  id: UUIDString;
  __typename?: 'FloorplanPage_Key';
}

export interface GetMyCompanyData {
  company?: {
    id: UUIDString;
    teamId: string;
    companyName: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
    primaryContactId?: UUIDString | null;
    quoteTemplateId?: UUIDString | null;
    quoteTemplate?: {
      id: UUIDString;
      name: string;
    } & QuoteTemplate_Key;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    contacts: ({
      id: UUIDString;
      companyId: UUIDString;
      name: string;
      email?: string | null;
      phoneNumber?: string | null;
      role?: string | null;
      createdAt: TimestampString;
      updatedAt: TimestampString;
    } & CompanyContact_Key)[];
  } & Company_Key;
}

export interface GetMyCompanyVariables {
  id: UUIDString;
}

export interface GetMyQuoteAppearanceData {
  quoteAppearances: ({
    teamId: string;
    logoStoragePath?: string | null;
    businessName?: string | null;
    abn?: string | null;
    licenceNumber?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    accentColor?: string | null;
    pricingDetail: string;
    showScopeOfWork: boolean;
    showTakeoffSummary: boolean;
    showSignatureBlock: boolean;
    validForDays: number;
    terms?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteAppearance_Key)[];
}

export interface GetMyTeamData {
  teamMembers: ({
    teamId: string;
    role: string;
    team: {
      id: string;
      name: string;
    } & Team_Key;
  })[];
}

export interface GetMyUserSettingsData {
  userSettings?: {
    ownerId: string;
    quoteFollowUpEnabled: boolean;
    quoteFollowUpDays: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & UserSettings_Key;
}

export interface GetMyUserSignatureData {
  userSignature?: {
    ownerId: string;
    name?: string | null;
    companyName?: string | null;
    address?: string | null;
    mobile?: string | null;
    phone?: string | null;
    email?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & UserSignature_Key;
}

export interface GetProjectQuestionnaireData {
  projectQuestionnaire?: {
    projectId: UUIDString;
    sourceTemplateId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    questions: ({
      id: UUIDString;
      label: string;
      position: number;
      answer?: string | null;
      answerSource: string;
    } & ProjectQuestionnaireQuestion_Key)[];
  } & ProjectQuestionnaire_Key;
}

export interface GetProjectQuestionnaireVariables {
  projectId: UUIDString;
}

export interface GetProjectQuoteData {
  project?: {
    id: UUIDString;
    teamId: string;
    quote?: {
      id: UUIDString;
      teamId: string;
      projectId: UUIDString;
      supplierId?: UUIDString | null;
      status: string;
      reference?: string | null;
      issuedAt?: TimestampString | null;
      sentAt?: TimestampString | null;
      acceptedAt?: TimestampString | null;
      createdAt: TimestampString;
      updatedAt: TimestampString;
      items: ({
        id: UUIDString;
        displayOrder: number;
        name: string;
        quantity: number;
        unit?: string | null;
        unitPriceCents: number;
        materialUnitPriceCents: number;
        labourUnitPriceCents: number;
        matchedKeywords: string[];
        sourceTemplateId?: UUIDString | null;
        quantitySourceId?: UUIDString | null;
        sourceTemplate?: {
          id: UUIDString;
          name: string;
          scope: string;
          systemKey?: string | null;
        } & QuoteItemTemplate_Key;
        quantitySource?: {
          id: UUIDString;
          measurementSource: string;
          measurementPlasterType?: string | null;
        } & QuantitySource_Key;
        createdAt: TimestampString;
        updatedAt: TimestampString;
      } & QuoteItem_Key)[];
    } & Quote_Key;
  } & Project_Key;
  appearance: ({
    teamId: string;
    logoStoragePath?: string | null;
    businessName?: string | null;
    abn?: string | null;
    licenceNumber?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    accentColor?: string | null;
    pricingDetail: string;
    showScopeOfWork: boolean;
    showTakeoffSummary: boolean;
    showSignatureBlock: boolean;
    validForDays: number;
    terms?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteAppearance_Key)[];
}

export interface GetProjectQuoteVariables {
  projectId: UUIDString;
}

export interface GetQuestionnaireTemplateData {
  questionnaireTemplate?: {
    id: UUIDString;
    teamId: string;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    questions: ({
      id: UUIDString;
      label: string;
      position: number;
    } & QuestionnaireTemplateQuestion_Key)[];
  } & QuestionnaireTemplate_Key;
}

export interface GetQuestionnaireTemplateVariables {
  id: UUIDString;
}

export interface GetQuoteByIdData {
  quote?: {
    id: UUIDString;
    teamId: string;
    projectId: UUIDString;
    supplierId?: UUIDString | null;
    status: string;
    reference?: string | null;
    issuedAt?: TimestampString | null;
    sentAt?: TimestampString | null;
    acceptedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    project: {
      id: UUIDString;
      name: string;
      company?: {
        id: UUIDString;
        companyName: string;
      } & Company_Key;
    } & Project_Key;
    items: ({
      id: UUIDString;
      displayOrder: number;
      name: string;
      quantity: number;
      unit?: string | null;
      unitPriceCents: number;
      materialUnitPriceCents: number;
      labourUnitPriceCents: number;
      matchedKeywords: string[];
      sourceTemplateId?: UUIDString | null;
      quantitySourceId?: UUIDString | null;
      quantitySource?: {
        id: UUIDString;
        measurementSource: string;
        measurementPlasterType?: string | null;
      } & QuantitySource_Key;
      createdAt: TimestampString;
      updatedAt: TimestampString;
    } & QuoteItem_Key)[];
  } & Quote_Key;
  appearance: ({
    teamId: string;
    logoStoragePath?: string | null;
    businessName?: string | null;
    abn?: string | null;
    licenceNumber?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    accentColor?: string | null;
    pricingDetail: string;
    showScopeOfWork: boolean;
    showTakeoffSummary: boolean;
    showSignatureBlock: boolean;
    validForDays: number;
    terms?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteAppearance_Key)[];
}

export interface GetQuoteByIdVariables {
  id: UUIDString;
}

export interface GetQuoteReadinessData {
  project?: {
    id: UUIDString;
    teamId: string;
    name: string;
    salesStatus: string;
    pageCount: number;
    extractedTextJson?: string | null;
    company?: {
      id: UUIDString;
      quoteTemplateId?: UUIDString | null;
      companyName: string;
      phoneNumber?: string | null;
      businessNumber?: string | null;
      primaryContactId?: UUIDString | null;
      primaryContact?: {
        id: UUIDString;
        name: string;
        email?: string | null;
        phoneNumber?: string | null;
      } & CompanyContact_Key;
    } & Company_Key;
  } & Project_Key;
  floorplanPages: ({
    id: UUIDString;
    pageNumber: number;
    scaleMmPerPx?: number | null;
    ceilingHeightMm?: number | null;
    overlayJson?: string | null;
    ocrTextContent?: string | null;
  } & FloorplanPage_Key)[];
  projectQuestionnaireQuestions: ({
    id: UUIDString;
    label: string;
    answer?: string | null;
    answerSource: string;
  } & ProjectQuestionnaireQuestion_Key)[];
  quoteItemTemplateConfigs: ({
    itemTemplateId: UUIDString;
    enabled: boolean;
    unitPriceCents: number;
    itemTemplate: {
      id: UUIDString;
      name: string;
      unit?: string | null;
      hasKeywords: boolean;
      keywords: string[];
      sortOrder: number;
      quantitySourceId?: UUIDString | null;
      quantitySource?: {
        id: UUIDString;
        measurementSource: string;
        measurementPlasterType?: string | null;
      } & QuantitySource_Key;
    } & QuoteItemTemplate_Key;
  })[];
}

export interface GetQuoteReadinessVariables {
  projectId: UUIDString;
  quoteTemplateId: UUIDString;
}

export interface ListMyCompaniesData {
  companies: ({
    id: UUIDString;
    teamId: string;
    companyName: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
    primaryContactId?: UUIDString | null;
    quoteTemplateId?: UUIDString | null;
    quoteTemplate?: {
      id: UUIDString;
      name: string;
    } & QuoteTemplate_Key;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Company_Key)[];
}

export interface ListMyCompaniesVariables {
  search?: string | null;
  limit?: number | null;
  offset?: number | null;
}

export interface ListMyCompanyContactsData {
  companyContacts: ({
    id: UUIDString;
    companyId: UUIDString;
    name: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CompanyContact_Key)[];
}

export interface ListMyCompanyContactsVariables {
  companyId: UUIDString;
}

export interface ListProjectQuestionnairesData {
  projectQuestionnaires: ({
    projectId: UUIDString;
    updatedAt: TimestampString;
    project: {
      name: string;
    };
    questions: ({
      id: UUIDString;
      answer?: string | null;
    } & ProjectQuestionnaireQuestion_Key)[];
  } & ProjectQuestionnaire_Key)[];
}

export interface ListQuestionnaireTemplatesData {
  questionnaireTemplates: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuestionnaireTemplate_Key)[];
}

export interface ListQuoteItemTemplateConfigsForQuoteTemplateData {
  quoteItemTemplateConfigs: ({
    quoteTemplateId: UUIDString;
    itemTemplateId: UUIDString;
    enabled: boolean;
    unitPriceCents: number;
    materialUnitPriceCents: number;
    labourUnitPriceCents: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    itemTemplate: {
      id: UUIDString;
      name: string;
      unit?: string | null;
      hasKeywords: boolean;
      keywords: string[];
      sortOrder: number;
    } & QuoteItemTemplate_Key;
  } & QuoteItemTemplateConfig_Key)[];
}

export interface ListQuoteItemTemplateConfigsForQuoteTemplateVariables {
  quoteTemplateId: UUIDString;
}

export interface ListQuoteItemTemplatesData {
  quoteItemTemplates: ({
    id: UUIDString;
    teamId?: string | null;
    scope: string;
    systemKey?: string | null;
    name: string;
    unit?: string | null;
    hasKeywords: boolean;
    keywords: string[];
    quantitySourceId?: UUIDString | null;
    sortOrder: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteItemTemplate_Key)[];
}

export interface ListQuoteTemplatesForTeamData {
  quoteTemplates: ({
    id: UUIDString;
    name: string;
    isDefault: boolean;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteTemplate_Key)[];
}

export interface ListQuotesForTeamData {
  quotes: ({
    id: UUIDString;
    reference?: string | null;
    status: string;
    createdAt: TimestampString;
    project: {
      id: UUIDString;
      name: string;
      company?: {
        id: UUIDString;
        companyName: string;
      } & Company_Key;
    } & Project_Key;
    items: ({
      quantity: number;
      unitPriceCents: number;
    })[];
  } & Quote_Key)[];
}

export interface ListQuotesForTeamVariables {
  limit?: number | null;
  offset?: number | null;
}

export interface ProjectQuestionnaireQuestion_Key {
  id: UUIDString;
  __typename?: 'ProjectQuestionnaireQuestion_Key';
}

export interface ProjectQuestionnaire_Key {
  projectId: UUIDString;
  __typename?: 'ProjectQuestionnaire_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface QuantitySource_Key {
  id: UUIDString;
  __typename?: 'QuantitySource_Key';
}

export interface QuestionnaireTemplateQuestion_Key {
  id: UUIDString;
  __typename?: 'QuestionnaireTemplateQuestion_Key';
}

export interface QuestionnaireTemplate_Key {
  id: UUIDString;
  __typename?: 'QuestionnaireTemplate_Key';
}

export interface QuoteAppearance_Key {
  teamId: string;
  __typename?: 'QuoteAppearance_Key';
}

export interface QuoteItemTemplateConfig_Key {
  quoteTemplateId: UUIDString;
  itemTemplateId: UUIDString;
  __typename?: 'QuoteItemTemplateConfig_Key';
}

export interface QuoteItemTemplate_Key {
  id: UUIDString;
  __typename?: 'QuoteItemTemplate_Key';
}

export interface QuoteItem_Key {
  id: UUIDString;
  __typename?: 'QuoteItem_Key';
}

export interface QuoteTemplate_Key {
  id: UUIDString;
  __typename?: 'QuoteTemplate_Key';
}

export interface Quote_Key {
  id: UUIDString;
  __typename?: 'Quote_Key';
}

export interface ReconcileSystemQuoteItemTemplatesData {
  quoteItemTemplateConfig_deleteMany: number;
  quoteItemTemplate_deleteMany: number;
  plasterboard10mmSource: QuantitySource_Key;
  plasterboard13mmSource: QuantitySource_Key;
  villaboard9mmSource: QuantitySource_Key;
  villaboard6mmSource: QuantitySource_Key;
  acoustic10mmSource: QuantitySource_Key;
  acoustic13mmSource: QuantitySource_Key;
  waterResistant10mmSource: QuantitySource_Key;
  waterResistant13mmSource: QuantitySource_Key;
  fireDry13mmSource: QuantitySource_Key;
  fireDry16mmSource: QuantitySource_Key;
  fireWet13mmSource: QuantitySource_Key;
  fireWet16mmSource: QuantitySource_Key;
  flexible6_5mmSource: QuantitySource_Key;
  plasterboard10mm: QuoteItemTemplate_Key;
  plasterboard13mm: QuoteItemTemplate_Key;
  villaboard9mm: QuoteItemTemplate_Key;
  villaboard6mm: QuoteItemTemplate_Key;
  acoustic10mm: QuoteItemTemplate_Key;
  acoustic13mm: QuoteItemTemplate_Key;
  waterResistant10mm: QuoteItemTemplate_Key;
  waterResistant13mm: QuoteItemTemplate_Key;
  fireDry13mm: QuoteItemTemplate_Key;
  fireDry16mm: QuoteItemTemplate_Key;
  fireWet13mm: QuoteItemTemplate_Key;
  fireWet16mm: QuoteItemTemplate_Key;
  flexible6_5mm: QuoteItemTemplate_Key;
}

export interface Reminder_Key {
  id: UUIDString;
  __typename?: 'Reminder_Key';
}

export interface RenameQuoteTemplateData {
  quoteTemplate_update?: QuoteTemplate_Key | null;
}

export interface RenameQuoteTemplateVariables {
  id: UUIDString;
  name: string;
}

export interface SetMyCompanyPrimaryContactData {
  company_update?: Company_Key | null;
}

export interface SetMyCompanyPrimaryContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
}

export interface SetQuoteTemplateAsDefaultData {
  quoteTemplate_updateMany: number;
  quoteTemplate_update?: QuoteTemplate_Key | null;
}

export interface SetQuoteTemplateAsDefaultVariables {
  id: UUIDString;
}

export interface SupplierQuoteItemPrice_Key {
  supplierId: UUIDString;
  templateId: UUIDString;
  __typename?: 'SupplierQuoteItemPrice_Key';
}

export interface Supplier_Key {
  id: UUIDString;
  __typename?: 'Supplier_Key';
}

export interface TeamInvitation_Key {
  teamId: string;
  email: string;
  __typename?: 'TeamInvitation_Key';
}

export interface TeamMember_Key {
  teamId: string;
  userId: string;
  __typename?: 'TeamMember_Key';
}

export interface Team_Key {
  id: string;
  __typename?: 'Team_Key';
}

export interface UpdateMyCompanyContactData {
  companyContact_update?: CompanyContact_Key | null;
}

export interface UpdateMyCompanyContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface UpdateMyCompanyData {
  company_update?: Company_Key | null;
}

export interface UpdateMyCompanyVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}

export interface UpdateMyQuoteAppearanceLogoData {
  quoteAppearance_upsert: QuoteAppearance_Key;
}

export interface UpdateMyQuoteAppearanceLogoVariables {
  logoStoragePath?: string | null;
}

export interface UpdateProjectQuestionnaireQuestionAnswerData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}

export interface UpdateProjectQuestionnaireQuestionAnswerSourceData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}

export interface UpdateProjectQuestionnaireQuestionAnswerSourceVariables {
  id: UUIDString;
  projectId: UUIDString;
  answerSource: string;
}

export interface UpdateProjectQuestionnaireQuestionAnswerVariables {
  id: UUIDString;
  projectId: UUIDString;
  answer?: string | null;
}

export interface UpdateProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}

export interface UpdateProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
  label: string;
  position: number;
}

export interface UpdateQuestionnaireTemplateNameData {
  questionnaireTemplate_update?: QuestionnaireTemplate_Key | null;
}

export interface UpdateQuestionnaireTemplateNameVariables {
  id: UUIDString;
  name: string;
}

export interface UpdateQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_update?: QuestionnaireTemplateQuestion_Key | null;
}

export interface UpdateQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
  label: string;
  position: number;
}

export interface UpdateQuoteDetailsData {
  quote_update?: Quote_Key | null;
}

export interface UpdateQuoteDetailsVariables {
  id: UUIDString;
  reference?: string | null;
}

export interface UpdateQuoteItemData {
  quoteItem_update?: QuoteItem_Key | null;
}

export interface UpdateQuoteItemTemplateConfigData {
  quoteItemTemplateConfig_update?: QuoteItemTemplateConfig_Key | null;
}

export interface UpdateQuoteItemTemplateConfigVariables {
  quoteTemplateId: UUIDString;
  itemTemplateId: UUIDString;
  enabled: boolean;
  unitPriceCents: number;
  materialUnitPriceCents: number;
  labourUnitPriceCents: number;
}

export interface UpdateQuoteItemTemplateWithUnitData {
  quoteItemTemplate_update?: QuoteItemTemplate_Key | null;
}

export interface UpdateQuoteItemTemplateWithUnitVariables {
  id: UUIDString;
  name: string;
  unit: string;
  hasKeywords: boolean;
  keywords: string[];
}

export interface UpdateQuoteItemVariables {
  id: UUIDString;
  displayOrder: number;
  name: string;
  quantity: number;
  unit?: string | null;
  unitPriceCents: number;
}

export interface UpdateQuoteStatusData {
  quote_update?: Quote_Key | null;
}

export interface UpdateQuoteStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpsertMyQuoteAppearanceData {
  quoteAppearance_upsert: QuoteAppearance_Key;
}

export interface UpsertMyQuoteAppearanceVariables {
  logoStoragePath?: string | null;
  businessName?: string | null;
  abn?: string | null;
  licenceNumber?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  accentColor?: string | null;
  pricingDetail: string;
  showScopeOfWork: boolean;
  showTakeoffSummary: boolean;
  showSignatureBlock: boolean;
  validForDays: number;
  terms?: string | null;
}

export interface UpsertMyUserSettingsData {
  userSettings_upsert: UserSettings_Key;
}

export interface UpsertMyUserSettingsVariables {
  quoteFollowUpEnabled: boolean;
  quoteFollowUpDays: number;
}

export interface UpsertMyUserSignatureData {
  userSignature_upsert: UserSignature_Key;
}

export interface UpsertMyUserSignatureVariables {
  name?: string | null;
  companyName?: string | null;
  address?: string | null;
  mobile?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface UserSettings_Key {
  ownerId: string;
  __typename?: 'UserSettings_Key';
}

export interface UserSignature_Key {
  ownerId: string;
  __typename?: 'UserSignature_Key';
}

interface CreateMyCompanyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyCompanyVariables): MutationRef<CreateMyCompanyData, CreateMyCompanyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMyCompanyVariables): MutationRef<CreateMyCompanyData, CreateMyCompanyVariables>;
  operationName: string;
}
export const createMyCompanyRef: CreateMyCompanyRef;

export function createMyCompany(vars: CreateMyCompanyVariables): MutationPromise<CreateMyCompanyData, CreateMyCompanyVariables>;
export function createMyCompany(dc: DataConnect, vars: CreateMyCompanyVariables): MutationPromise<CreateMyCompanyData, CreateMyCompanyVariables>;

interface UpdateMyCompanyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyCompanyVariables): MutationRef<UpdateMyCompanyData, UpdateMyCompanyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyCompanyVariables): MutationRef<UpdateMyCompanyData, UpdateMyCompanyVariables>;
  operationName: string;
}
export const updateMyCompanyRef: UpdateMyCompanyRef;

export function updateMyCompany(vars: UpdateMyCompanyVariables): MutationPromise<UpdateMyCompanyData, UpdateMyCompanyVariables>;
export function updateMyCompany(dc: DataConnect, vars: UpdateMyCompanyVariables): MutationPromise<UpdateMyCompanyData, UpdateMyCompanyVariables>;

interface SetMyCompanyPrimaryContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyCompanyPrimaryContactVariables): MutationRef<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetMyCompanyPrimaryContactVariables): MutationRef<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
  operationName: string;
}
export const setMyCompanyPrimaryContactRef: SetMyCompanyPrimaryContactRef;

export function setMyCompanyPrimaryContact(vars: SetMyCompanyPrimaryContactVariables): MutationPromise<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
export function setMyCompanyPrimaryContact(dc: DataConnect, vars: SetMyCompanyPrimaryContactVariables): MutationPromise<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;

interface ClearMyCompanyPrimaryContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearMyCompanyPrimaryContactVariables): MutationRef<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClearMyCompanyPrimaryContactVariables): MutationRef<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
  operationName: string;
}
export const clearMyCompanyPrimaryContactRef: ClearMyCompanyPrimaryContactRef;

export function clearMyCompanyPrimaryContact(vars: ClearMyCompanyPrimaryContactVariables): MutationPromise<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
export function clearMyCompanyPrimaryContact(dc: DataConnect, vars: ClearMyCompanyPrimaryContactVariables): MutationPromise<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;

interface AssignQuoteTemplateToCompanyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignQuoteTemplateToCompanyVariables): MutationRef<AssignQuoteTemplateToCompanyData, AssignQuoteTemplateToCompanyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignQuoteTemplateToCompanyVariables): MutationRef<AssignQuoteTemplateToCompanyData, AssignQuoteTemplateToCompanyVariables>;
  operationName: string;
}
export const assignQuoteTemplateToCompanyRef: AssignQuoteTemplateToCompanyRef;

export function assignQuoteTemplateToCompany(vars: AssignQuoteTemplateToCompanyVariables): MutationPromise<AssignQuoteTemplateToCompanyData, AssignQuoteTemplateToCompanyVariables>;
export function assignQuoteTemplateToCompany(dc: DataConnect, vars: AssignQuoteTemplateToCompanyVariables): MutationPromise<AssignQuoteTemplateToCompanyData, AssignQuoteTemplateToCompanyVariables>;

interface ClearCompanyQuoteTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearCompanyQuoteTemplateVariables): MutationRef<ClearCompanyQuoteTemplateData, ClearCompanyQuoteTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClearCompanyQuoteTemplateVariables): MutationRef<ClearCompanyQuoteTemplateData, ClearCompanyQuoteTemplateVariables>;
  operationName: string;
}
export const clearCompanyQuoteTemplateRef: ClearCompanyQuoteTemplateRef;

export function clearCompanyQuoteTemplate(vars: ClearCompanyQuoteTemplateVariables): MutationPromise<ClearCompanyQuoteTemplateData, ClearCompanyQuoteTemplateVariables>;
export function clearCompanyQuoteTemplate(dc: DataConnect, vars: ClearCompanyQuoteTemplateVariables): MutationPromise<ClearCompanyQuoteTemplateData, ClearCompanyQuoteTemplateVariables>;

interface DeleteMyCompanyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyCompanyVariables): MutationRef<DeleteMyCompanyData, DeleteMyCompanyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMyCompanyVariables): MutationRef<DeleteMyCompanyData, DeleteMyCompanyVariables>;
  operationName: string;
}
export const deleteMyCompanyRef: DeleteMyCompanyRef;

export function deleteMyCompany(vars: DeleteMyCompanyVariables): MutationPromise<DeleteMyCompanyData, DeleteMyCompanyVariables>;
export function deleteMyCompany(dc: DataConnect, vars: DeleteMyCompanyVariables): MutationPromise<DeleteMyCompanyData, DeleteMyCompanyVariables>;

interface CreateMyCompanyContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyCompanyContactVariables): MutationRef<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMyCompanyContactVariables): MutationRef<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
  operationName: string;
}
export const createMyCompanyContactRef: CreateMyCompanyContactRef;

export function createMyCompanyContact(vars: CreateMyCompanyContactVariables): MutationPromise<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
export function createMyCompanyContact(dc: DataConnect, vars: CreateMyCompanyContactVariables): MutationPromise<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;

interface UpdateMyCompanyContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyCompanyContactVariables): MutationRef<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyCompanyContactVariables): MutationRef<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
  operationName: string;
}
export const updateMyCompanyContactRef: UpdateMyCompanyContactRef;

export function updateMyCompanyContact(vars: UpdateMyCompanyContactVariables): MutationPromise<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
export function updateMyCompanyContact(dc: DataConnect, vars: UpdateMyCompanyContactVariables): MutationPromise<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;

interface DeleteMyCompanyContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyCompanyContactVariables): MutationRef<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMyCompanyContactVariables): MutationRef<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
  operationName: string;
}
export const deleteMyCompanyContactRef: DeleteMyCompanyContactRef;

export function deleteMyCompanyContact(vars: DeleteMyCompanyContactVariables): MutationPromise<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
export function deleteMyCompanyContact(dc: DataConnect, vars: DeleteMyCompanyContactVariables): MutationPromise<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;

interface ListMyCompaniesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMyCompaniesVariables): QueryRef<ListMyCompaniesData, ListMyCompaniesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListMyCompaniesVariables): QueryRef<ListMyCompaniesData, ListMyCompaniesVariables>;
  operationName: string;
}
export const listMyCompaniesRef: ListMyCompaniesRef;

export function listMyCompanies(vars?: ListMyCompaniesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, ListMyCompaniesVariables>;
export function listMyCompanies(dc: DataConnect, vars?: ListMyCompaniesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, ListMyCompaniesVariables>;

interface GetMyCompanyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyCompanyVariables): QueryRef<GetMyCompanyData, GetMyCompanyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyCompanyVariables): QueryRef<GetMyCompanyData, GetMyCompanyVariables>;
  operationName: string;
}
export const getMyCompanyRef: GetMyCompanyRef;

export function getMyCompany(vars: GetMyCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCompanyData, GetMyCompanyVariables>;
export function getMyCompany(dc: DataConnect, vars: GetMyCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCompanyData, GetMyCompanyVariables>;

interface ListMyCompanyContactsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMyCompanyContactsVariables): QueryRef<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMyCompanyContactsVariables): QueryRef<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
  operationName: string;
}
export const listMyCompanyContactsRef: ListMyCompanyContactsRef;

export function listMyCompanyContacts(vars: ListMyCompanyContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
export function listMyCompanyContacts(dc: DataConnect, vars: ListMyCompanyContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;

interface CreateQuestionnaireTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionnaireTemplateVariables): MutationRef<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionnaireTemplateVariables): MutationRef<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
  operationName: string;
}
export const createQuestionnaireTemplateRef: CreateQuestionnaireTemplateRef;

export function createQuestionnaireTemplate(vars: CreateQuestionnaireTemplateVariables): MutationPromise<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
export function createQuestionnaireTemplate(dc: DataConnect, vars: CreateQuestionnaireTemplateVariables): MutationPromise<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;

interface CreateQuestionnaireTemplateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionnaireTemplateQuestionVariables): MutationRef<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionnaireTemplateQuestionVariables): MutationRef<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
  operationName: string;
}
export const createQuestionnaireTemplateQuestionRef: CreateQuestionnaireTemplateQuestionRef;

export function createQuestionnaireTemplateQuestion(vars: CreateQuestionnaireTemplateQuestionVariables): MutationPromise<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
export function createQuestionnaireTemplateQuestion(dc: DataConnect, vars: CreateQuestionnaireTemplateQuestionVariables): MutationPromise<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;

interface UpdateQuestionnaireTemplateNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionnaireTemplateNameVariables): MutationRef<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuestionnaireTemplateNameVariables): MutationRef<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
  operationName: string;
}
export const updateQuestionnaireTemplateNameRef: UpdateQuestionnaireTemplateNameRef;

export function updateQuestionnaireTemplateName(vars: UpdateQuestionnaireTemplateNameVariables): MutationPromise<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
export function updateQuestionnaireTemplateName(dc: DataConnect, vars: UpdateQuestionnaireTemplateNameVariables): MutationPromise<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;

interface UpdateQuestionnaireTemplateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionnaireTemplateQuestionVariables): MutationRef<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuestionnaireTemplateQuestionVariables): MutationRef<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
  operationName: string;
}
export const updateQuestionnaireTemplateQuestionRef: UpdateQuestionnaireTemplateQuestionRef;

export function updateQuestionnaireTemplateQuestion(vars: UpdateQuestionnaireTemplateQuestionVariables): MutationPromise<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
export function updateQuestionnaireTemplateQuestion(dc: DataConnect, vars: UpdateQuestionnaireTemplateQuestionVariables): MutationPromise<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;

interface DeleteQuestionnaireTemplateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionnaireTemplateQuestionVariables): MutationRef<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuestionnaireTemplateQuestionVariables): MutationRef<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
  operationName: string;
}
export const deleteQuestionnaireTemplateQuestionRef: DeleteQuestionnaireTemplateQuestionRef;

export function deleteQuestionnaireTemplateQuestion(vars: DeleteQuestionnaireTemplateQuestionVariables): MutationPromise<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
export function deleteQuestionnaireTemplateQuestion(dc: DataConnect, vars: DeleteQuestionnaireTemplateQuestionVariables): MutationPromise<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;

interface DeleteQuestionnaireTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionnaireTemplateVariables): MutationRef<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuestionnaireTemplateVariables): MutationRef<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
  operationName: string;
}
export const deleteQuestionnaireTemplateRef: DeleteQuestionnaireTemplateRef;

export function deleteQuestionnaireTemplate(vars: DeleteQuestionnaireTemplateVariables): MutationPromise<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
export function deleteQuestionnaireTemplate(dc: DataConnect, vars: DeleteQuestionnaireTemplateVariables): MutationPromise<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;

interface EnsureProjectQuestionnaireRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnsureProjectQuestionnaireVariables): MutationRef<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EnsureProjectQuestionnaireVariables): MutationRef<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
  operationName: string;
}
export const ensureProjectQuestionnaireRef: EnsureProjectQuestionnaireRef;

export function ensureProjectQuestionnaire(vars: EnsureProjectQuestionnaireVariables): MutationPromise<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
export function ensureProjectQuestionnaire(dc: DataConnect, vars: EnsureProjectQuestionnaireVariables): MutationPromise<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;

interface ApplyQuestionnaireTemplateToProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApplyQuestionnaireTemplateToProjectVariables): MutationRef<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ApplyQuestionnaireTemplateToProjectVariables): MutationRef<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
  operationName: string;
}
export const applyQuestionnaireTemplateToProjectRef: ApplyQuestionnaireTemplateToProjectRef;

export function applyQuestionnaireTemplateToProject(vars: ApplyQuestionnaireTemplateToProjectVariables): MutationPromise<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
export function applyQuestionnaireTemplateToProject(dc: DataConnect, vars: ApplyQuestionnaireTemplateToProjectVariables): MutationPromise<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;

interface BatchApplyQuestionnaireTemplateToProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BatchApplyQuestionnaireTemplateToProjectVariables): MutationRef<BatchApplyQuestionnaireTemplateToProjectData, BatchApplyQuestionnaireTemplateToProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BatchApplyQuestionnaireTemplateToProjectVariables): MutationRef<BatchApplyQuestionnaireTemplateToProjectData, BatchApplyQuestionnaireTemplateToProjectVariables>;
  operationName: string;
}
export const batchApplyQuestionnaireTemplateToProjectRef: BatchApplyQuestionnaireTemplateToProjectRef;

export function batchApplyQuestionnaireTemplateToProject(vars: BatchApplyQuestionnaireTemplateToProjectVariables): MutationPromise<BatchApplyQuestionnaireTemplateToProjectData, BatchApplyQuestionnaireTemplateToProjectVariables>;
export function batchApplyQuestionnaireTemplateToProject(dc: DataConnect, vars: BatchApplyQuestionnaireTemplateToProjectVariables): MutationPromise<BatchApplyQuestionnaireTemplateToProjectData, BatchApplyQuestionnaireTemplateToProjectVariables>;

interface CreateProjectQuestionnaireQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectQuestionnaireQuestionVariables): MutationRef<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectQuestionnaireQuestionVariables): MutationRef<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
  operationName: string;
}
export const createProjectQuestionnaireQuestionRef: CreateProjectQuestionnaireQuestionRef;

export function createProjectQuestionnaireQuestion(vars: CreateProjectQuestionnaireQuestionVariables): MutationPromise<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
export function createProjectQuestionnaireQuestion(dc: DataConnect, vars: CreateProjectQuestionnaireQuestionVariables): MutationPromise<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;

interface UpdateProjectQuestionnaireQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectQuestionnaireQuestionVariables): MutationRef<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionVariables): MutationRef<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
  operationName: string;
}
export const updateProjectQuestionnaireQuestionRef: UpdateProjectQuestionnaireQuestionRef;

export function updateProjectQuestionnaireQuestion(vars: UpdateProjectQuestionnaireQuestionVariables): MutationPromise<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
export function updateProjectQuestionnaireQuestion(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionVariables): MutationPromise<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;

interface UpdateProjectQuestionnaireQuestionAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
  operationName: string;
}
export const updateProjectQuestionnaireQuestionAnswerRef: UpdateProjectQuestionnaireQuestionAnswerRef;

export function updateProjectQuestionnaireQuestionAnswer(vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
export function updateProjectQuestionnaireQuestionAnswer(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;

interface UpdateProjectQuestionnaireQuestionAnswerSourceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
  operationName: string;
}
export const updateProjectQuestionnaireQuestionAnswerSourceRef: UpdateProjectQuestionnaireQuestionAnswerSourceRef;

export function updateProjectQuestionnaireQuestionAnswerSource(vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
export function updateProjectQuestionnaireQuestionAnswerSource(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;

interface DeleteProjectQuestionnaireQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectQuestionnaireQuestionVariables): MutationRef<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectQuestionnaireQuestionVariables): MutationRef<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
  operationName: string;
}
export const deleteProjectQuestionnaireQuestionRef: DeleteProjectQuestionnaireQuestionRef;

export function deleteProjectQuestionnaireQuestion(vars: DeleteProjectQuestionnaireQuestionVariables): MutationPromise<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
export function deleteProjectQuestionnaireQuestion(dc: DataConnect, vars: DeleteProjectQuestionnaireQuestionVariables): MutationPromise<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;

interface ListQuestionnaireTemplatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuestionnaireTemplatesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuestionnaireTemplatesData, undefined>;
  operationName: string;
}
export const listQuestionnaireTemplatesRef: ListQuestionnaireTemplatesRef;

export function listQuestionnaireTemplates(options?: ExecuteQueryOptions): QueryPromise<ListQuestionnaireTemplatesData, undefined>;
export function listQuestionnaireTemplates(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuestionnaireTemplatesData, undefined>;

interface GetQuestionnaireTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionnaireTemplateVariables): QueryRef<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuestionnaireTemplateVariables): QueryRef<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
  operationName: string;
}
export const getQuestionnaireTemplateRef: GetQuestionnaireTemplateRef;

export function getQuestionnaireTemplate(vars: GetQuestionnaireTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
export function getQuestionnaireTemplate(dc: DataConnect, vars: GetQuestionnaireTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;

interface ListProjectQuestionnairesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectQuestionnairesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectQuestionnairesData, undefined>;
  operationName: string;
}
export const listProjectQuestionnairesRef: ListProjectQuestionnairesRef;

export function listProjectQuestionnaires(options?: ExecuteQueryOptions): QueryPromise<ListProjectQuestionnairesData, undefined>;
export function listProjectQuestionnaires(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectQuestionnairesData, undefined>;

interface GetProjectQuestionnaireRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectQuestionnaireVariables): QueryRef<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectQuestionnaireVariables): QueryRef<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
  operationName: string;
}
export const getProjectQuestionnaireRef: GetProjectQuestionnaireRef;

export function getProjectQuestionnaire(vars: GetProjectQuestionnaireVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
export function getProjectQuestionnaire(dc: DataConnect, vars: GetProjectQuestionnaireVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;

interface ReconcileSystemQuoteItemTemplatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<ReconcileSystemQuoteItemTemplatesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<ReconcileSystemQuoteItemTemplatesData, undefined>;
  operationName: string;
}
export const reconcileSystemQuoteItemTemplatesRef: ReconcileSystemQuoteItemTemplatesRef;

export function reconcileSystemQuoteItemTemplates(): MutationPromise<ReconcileSystemQuoteItemTemplatesData, undefined>;
export function reconcileSystemQuoteItemTemplates(dc: DataConnect): MutationPromise<ReconcileSystemQuoteItemTemplatesData, undefined>;

interface CreateQuoteTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteTemplateVariables): MutationRef<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteTemplateVariables): MutationRef<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;
  operationName: string;
}
export const createQuoteTemplateRef: CreateQuoteTemplateRef;

export function createQuoteTemplate(vars: CreateQuoteTemplateVariables): MutationPromise<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;
export function createQuoteTemplate(dc: DataConnect, vars: CreateQuoteTemplateVariables): MutationPromise<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;

interface RenameQuoteTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenameQuoteTemplateVariables): MutationRef<RenameQuoteTemplateData, RenameQuoteTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RenameQuoteTemplateVariables): MutationRef<RenameQuoteTemplateData, RenameQuoteTemplateVariables>;
  operationName: string;
}
export const renameQuoteTemplateRef: RenameQuoteTemplateRef;

export function renameQuoteTemplate(vars: RenameQuoteTemplateVariables): MutationPromise<RenameQuoteTemplateData, RenameQuoteTemplateVariables>;
export function renameQuoteTemplate(dc: DataConnect, vars: RenameQuoteTemplateVariables): MutationPromise<RenameQuoteTemplateData, RenameQuoteTemplateVariables>;

interface SetQuoteTemplateAsDefaultRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetQuoteTemplateAsDefaultVariables): MutationRef<SetQuoteTemplateAsDefaultData, SetQuoteTemplateAsDefaultVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetQuoteTemplateAsDefaultVariables): MutationRef<SetQuoteTemplateAsDefaultData, SetQuoteTemplateAsDefaultVariables>;
  operationName: string;
}
export const setQuoteTemplateAsDefaultRef: SetQuoteTemplateAsDefaultRef;

export function setQuoteTemplateAsDefault(vars: SetQuoteTemplateAsDefaultVariables): MutationPromise<SetQuoteTemplateAsDefaultData, SetQuoteTemplateAsDefaultVariables>;
export function setQuoteTemplateAsDefault(dc: DataConnect, vars: SetQuoteTemplateAsDefaultVariables): MutationPromise<SetQuoteTemplateAsDefaultData, SetQuoteTemplateAsDefaultVariables>;

interface DeleteQuoteTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteTemplateVariables): MutationRef<DeleteQuoteTemplateData, DeleteQuoteTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuoteTemplateVariables): MutationRef<DeleteQuoteTemplateData, DeleteQuoteTemplateVariables>;
  operationName: string;
}
export const deleteQuoteTemplateRef: DeleteQuoteTemplateRef;

export function deleteQuoteTemplate(vars: DeleteQuoteTemplateVariables): MutationPromise<DeleteQuoteTemplateData, DeleteQuoteTemplateVariables>;
export function deleteQuoteTemplate(dc: DataConnect, vars: DeleteQuoteTemplateVariables): MutationPromise<DeleteQuoteTemplateData, DeleteQuoteTemplateVariables>;

interface CreateQuoteTemplateVariationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteTemplateVariationVariables): MutationRef<CreateQuoteTemplateVariationData, CreateQuoteTemplateVariationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteTemplateVariationVariables): MutationRef<CreateQuoteTemplateVariationData, CreateQuoteTemplateVariationVariables>;
  operationName: string;
}
export const createQuoteTemplateVariationRef: CreateQuoteTemplateVariationRef;

export function createQuoteTemplateVariation(vars: CreateQuoteTemplateVariationVariables): MutationPromise<CreateQuoteTemplateVariationData, CreateQuoteTemplateVariationVariables>;
export function createQuoteTemplateVariation(dc: DataConnect, vars: CreateQuoteTemplateVariationVariables): MutationPromise<CreateQuoteTemplateVariationData, CreateQuoteTemplateVariationVariables>;

interface CreateQuoteItemTemplateConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemTemplateConfigVariables): MutationRef<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteItemTemplateConfigVariables): MutationRef<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;
  operationName: string;
}
export const createQuoteItemTemplateConfigRef: CreateQuoteItemTemplateConfigRef;

export function createQuoteItemTemplateConfig(vars: CreateQuoteItemTemplateConfigVariables): MutationPromise<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;
export function createQuoteItemTemplateConfig(dc: DataConnect, vars: CreateQuoteItemTemplateConfigVariables): MutationPromise<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;

interface UpdateQuoteItemTemplateConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemTemplateConfigVariables): MutationRef<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteItemTemplateConfigVariables): MutationRef<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;
  operationName: string;
}
export const updateQuoteItemTemplateConfigRef: UpdateQuoteItemTemplateConfigRef;

export function updateQuoteItemTemplateConfig(vars: UpdateQuoteItemTemplateConfigVariables): MutationPromise<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;
export function updateQuoteItemTemplateConfig(dc: DataConnect, vars: UpdateQuoteItemTemplateConfigVariables): MutationPromise<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;

interface CreateQuoteItemTemplateWithUnitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemTemplateWithUnitVariables): MutationRef<CreateQuoteItemTemplateWithUnitData, CreateQuoteItemTemplateWithUnitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteItemTemplateWithUnitVariables): MutationRef<CreateQuoteItemTemplateWithUnitData, CreateQuoteItemTemplateWithUnitVariables>;
  operationName: string;
}
export const createQuoteItemTemplateWithUnitRef: CreateQuoteItemTemplateWithUnitRef;

export function createQuoteItemTemplateWithUnit(vars: CreateQuoteItemTemplateWithUnitVariables): MutationPromise<CreateQuoteItemTemplateWithUnitData, CreateQuoteItemTemplateWithUnitVariables>;
export function createQuoteItemTemplateWithUnit(dc: DataConnect, vars: CreateQuoteItemTemplateWithUnitVariables): MutationPromise<CreateQuoteItemTemplateWithUnitData, CreateQuoteItemTemplateWithUnitVariables>;

interface UpdateQuoteItemTemplateWithUnitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemTemplateWithUnitVariables): MutationRef<UpdateQuoteItemTemplateWithUnitData, UpdateQuoteItemTemplateWithUnitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteItemTemplateWithUnitVariables): MutationRef<UpdateQuoteItemTemplateWithUnitData, UpdateQuoteItemTemplateWithUnitVariables>;
  operationName: string;
}
export const updateQuoteItemTemplateWithUnitRef: UpdateQuoteItemTemplateWithUnitRef;

export function updateQuoteItemTemplateWithUnit(vars: UpdateQuoteItemTemplateWithUnitVariables): MutationPromise<UpdateQuoteItemTemplateWithUnitData, UpdateQuoteItemTemplateWithUnitVariables>;
export function updateQuoteItemTemplateWithUnit(dc: DataConnect, vars: UpdateQuoteItemTemplateWithUnitVariables): MutationPromise<UpdateQuoteItemTemplateWithUnitData, UpdateQuoteItemTemplateWithUnitVariables>;

interface DeleteQuoteItemTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteItemTemplateVariables): MutationRef<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuoteItemTemplateVariables): MutationRef<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
  operationName: string;
}
export const deleteQuoteItemTemplateRef: DeleteQuoteItemTemplateRef;

export function deleteQuoteItemTemplate(vars: DeleteQuoteItemTemplateVariables): MutationPromise<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
export function deleteQuoteItemTemplate(dc: DataConnect, vars: DeleteQuoteItemTemplateVariables): MutationPromise<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;

interface UpdateQuoteStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteStatusVariables): MutationRef<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteStatusVariables): MutationRef<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
  operationName: string;
}
export const updateQuoteStatusRef: UpdateQuoteStatusRef;

export function updateQuoteStatus(vars: UpdateQuoteStatusVariables): MutationPromise<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
export function updateQuoteStatus(dc: DataConnect, vars: UpdateQuoteStatusVariables): MutationPromise<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;

interface UpdateQuoteDetailsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteDetailsVariables): MutationRef<UpdateQuoteDetailsData, UpdateQuoteDetailsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteDetailsVariables): MutationRef<UpdateQuoteDetailsData, UpdateQuoteDetailsVariables>;
  operationName: string;
}
export const updateQuoteDetailsRef: UpdateQuoteDetailsRef;

export function updateQuoteDetails(vars: UpdateQuoteDetailsVariables): MutationPromise<UpdateQuoteDetailsData, UpdateQuoteDetailsVariables>;
export function updateQuoteDetails(dc: DataConnect, vars: UpdateQuoteDetailsVariables): MutationPromise<UpdateQuoteDetailsData, UpdateQuoteDetailsVariables>;

interface UpdateQuoteItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemVariables): MutationRef<UpdateQuoteItemData, UpdateQuoteItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteItemVariables): MutationRef<UpdateQuoteItemData, UpdateQuoteItemVariables>;
  operationName: string;
}
export const updateQuoteItemRef: UpdateQuoteItemRef;

export function updateQuoteItem(vars: UpdateQuoteItemVariables): MutationPromise<UpdateQuoteItemData, UpdateQuoteItemVariables>;
export function updateQuoteItem(dc: DataConnect, vars: UpdateQuoteItemVariables): MutationPromise<UpdateQuoteItemData, UpdateQuoteItemVariables>;

interface CreateQuoteItemWithUnitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemWithUnitVariables): MutationRef<CreateQuoteItemWithUnitData, CreateQuoteItemWithUnitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteItemWithUnitVariables): MutationRef<CreateQuoteItemWithUnitData, CreateQuoteItemWithUnitVariables>;
  operationName: string;
}
export const createQuoteItemWithUnitRef: CreateQuoteItemWithUnitRef;

export function createQuoteItemWithUnit(vars: CreateQuoteItemWithUnitVariables): MutationPromise<CreateQuoteItemWithUnitData, CreateQuoteItemWithUnitVariables>;
export function createQuoteItemWithUnit(dc: DataConnect, vars: CreateQuoteItemWithUnitVariables): MutationPromise<CreateQuoteItemWithUnitData, CreateQuoteItemWithUnitVariables>;

interface DeleteQuoteItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteItemVariables): MutationRef<DeleteQuoteItemData, DeleteQuoteItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuoteItemVariables): MutationRef<DeleteQuoteItemData, DeleteQuoteItemVariables>;
  operationName: string;
}
export const deleteQuoteItemRef: DeleteQuoteItemRef;

export function deleteQuoteItem(vars: DeleteQuoteItemVariables): MutationPromise<DeleteQuoteItemData, DeleteQuoteItemVariables>;
export function deleteQuoteItem(dc: DataConnect, vars: DeleteQuoteItemVariables): MutationPromise<DeleteQuoteItemData, DeleteQuoteItemVariables>;

interface CreateQuoteWithItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteWithItemsVariables): MutationRef<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteWithItemsVariables): MutationRef<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;
  operationName: string;
}
export const createQuoteWithItemsRef: CreateQuoteWithItemsRef;

export function createQuoteWithItems(vars: CreateQuoteWithItemsVariables): MutationPromise<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;
export function createQuoteWithItems(dc: DataConnect, vars: CreateQuoteWithItemsVariables): MutationPromise<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;

interface UpsertMyQuoteAppearanceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyQuoteAppearanceVariables): MutationRef<UpsertMyQuoteAppearanceData, UpsertMyQuoteAppearanceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertMyQuoteAppearanceVariables): MutationRef<UpsertMyQuoteAppearanceData, UpsertMyQuoteAppearanceVariables>;
  operationName: string;
}
export const upsertMyQuoteAppearanceRef: UpsertMyQuoteAppearanceRef;

export function upsertMyQuoteAppearance(vars: UpsertMyQuoteAppearanceVariables): MutationPromise<UpsertMyQuoteAppearanceData, UpsertMyQuoteAppearanceVariables>;
export function upsertMyQuoteAppearance(dc: DataConnect, vars: UpsertMyQuoteAppearanceVariables): MutationPromise<UpsertMyQuoteAppearanceData, UpsertMyQuoteAppearanceVariables>;

interface UpdateMyQuoteAppearanceLogoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyQuoteAppearanceLogoVariables): MutationRef<UpdateMyQuoteAppearanceLogoData, UpdateMyQuoteAppearanceLogoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateMyQuoteAppearanceLogoVariables): MutationRef<UpdateMyQuoteAppearanceLogoData, UpdateMyQuoteAppearanceLogoVariables>;
  operationName: string;
}
export const updateMyQuoteAppearanceLogoRef: UpdateMyQuoteAppearanceLogoRef;

export function updateMyQuoteAppearanceLogo(vars?: UpdateMyQuoteAppearanceLogoVariables): MutationPromise<UpdateMyQuoteAppearanceLogoData, UpdateMyQuoteAppearanceLogoVariables>;
export function updateMyQuoteAppearanceLogo(dc: DataConnect, vars?: UpdateMyQuoteAppearanceLogoVariables): MutationPromise<UpdateMyQuoteAppearanceLogoData, UpdateMyQuoteAppearanceLogoVariables>;

interface ListQuoteItemTemplatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuoteItemTemplatesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuoteItemTemplatesData, undefined>;
  operationName: string;
}
export const listQuoteItemTemplatesRef: ListQuoteItemTemplatesRef;

export function listQuoteItemTemplates(options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplatesData, undefined>;
export function listQuoteItemTemplates(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplatesData, undefined>;

interface ListQuoteTemplatesForTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuoteTemplatesForTeamData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuoteTemplatesForTeamData, undefined>;
  operationName: string;
}
export const listQuoteTemplatesForTeamRef: ListQuoteTemplatesForTeamRef;

export function listQuoteTemplatesForTeam(options?: ExecuteQueryOptions): QueryPromise<ListQuoteTemplatesForTeamData, undefined>;
export function listQuoteTemplatesForTeam(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuoteTemplatesForTeamData, undefined>;

interface GetMyQuoteAppearanceRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyQuoteAppearanceData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyQuoteAppearanceData, undefined>;
  operationName: string;
}
export const getMyQuoteAppearanceRef: GetMyQuoteAppearanceRef;

export function getMyQuoteAppearance(options?: ExecuteQueryOptions): QueryPromise<GetMyQuoteAppearanceData, undefined>;
export function getMyQuoteAppearance(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyQuoteAppearanceData, undefined>;

interface ListQuoteItemTemplateConfigsForQuoteTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables): QueryRef<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables): QueryRef<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
  operationName: string;
}
export const listQuoteItemTemplateConfigsForQuoteTemplateRef: ListQuoteItemTemplateConfigsForQuoteTemplateRef;

export function listQuoteItemTemplateConfigsForQuoteTemplate(vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
export function listQuoteItemTemplateConfigsForQuoteTemplate(dc: DataConnect, vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;

interface ListQuotesForTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListQuotesForTeamVariables): QueryRef<ListQuotesForTeamData, ListQuotesForTeamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListQuotesForTeamVariables): QueryRef<ListQuotesForTeamData, ListQuotesForTeamVariables>;
  operationName: string;
}
export const listQuotesForTeamRef: ListQuotesForTeamRef;

export function listQuotesForTeam(vars?: ListQuotesForTeamVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuotesForTeamData, ListQuotesForTeamVariables>;
export function listQuotesForTeam(dc: DataConnect, vars?: ListQuotesForTeamVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuotesForTeamData, ListQuotesForTeamVariables>;

interface GetQuoteByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuoteByIdVariables): QueryRef<GetQuoteByIdData, GetQuoteByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuoteByIdVariables): QueryRef<GetQuoteByIdData, GetQuoteByIdVariables>;
  operationName: string;
}
export const getQuoteByIdRef: GetQuoteByIdRef;

export function getQuoteById(vars: GetQuoteByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuoteByIdData, GetQuoteByIdVariables>;
export function getQuoteById(dc: DataConnect, vars: GetQuoteByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuoteByIdData, GetQuoteByIdVariables>;

interface GetQuoteReadinessRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuoteReadinessVariables): QueryRef<GetQuoteReadinessData, GetQuoteReadinessVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuoteReadinessVariables): QueryRef<GetQuoteReadinessData, GetQuoteReadinessVariables>;
  operationName: string;
}
export const getQuoteReadinessRef: GetQuoteReadinessRef;

export function getQuoteReadiness(vars: GetQuoteReadinessVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuoteReadinessData, GetQuoteReadinessVariables>;
export function getQuoteReadiness(dc: DataConnect, vars: GetQuoteReadinessVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuoteReadinessData, GetQuoteReadinessVariables>;

interface GetProjectQuoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectQuoteVariables): QueryRef<GetProjectQuoteData, GetProjectQuoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectQuoteVariables): QueryRef<GetProjectQuoteData, GetProjectQuoteVariables>;
  operationName: string;
}
export const getProjectQuoteRef: GetProjectQuoteRef;

export function getProjectQuote(vars: GetProjectQuoteVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuoteData, GetProjectQuoteVariables>;
export function getProjectQuote(dc: DataConnect, vars: GetProjectQuoteVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuoteData, GetProjectQuoteVariables>;

interface GetMyTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyTeamData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyTeamData, undefined>;
  operationName: string;
}
export const getMyTeamRef: GetMyTeamRef;

export function getMyTeam(options?: ExecuteQueryOptions): QueryPromise<GetMyTeamData, undefined>;
export function getMyTeam(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyTeamData, undefined>;

interface UpsertMyUserSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyUserSettingsVariables): MutationRef<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertMyUserSettingsVariables): MutationRef<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
  operationName: string;
}
export const upsertMyUserSettingsRef: UpsertMyUserSettingsRef;

export function upsertMyUserSettings(vars: UpsertMyUserSettingsVariables): MutationPromise<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
export function upsertMyUserSettings(dc: DataConnect, vars: UpsertMyUserSettingsVariables): MutationPromise<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;

interface UpsertMyUserSignatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpsertMyUserSignatureVariables): MutationRef<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpsertMyUserSignatureVariables): MutationRef<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
  operationName: string;
}
export const upsertMyUserSignatureRef: UpsertMyUserSignatureRef;

export function upsertMyUserSignature(vars?: UpsertMyUserSignatureVariables): MutationPromise<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
export function upsertMyUserSignature(dc: DataConnect, vars?: UpsertMyUserSignatureVariables): MutationPromise<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;

interface GetMyUserSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserSettingsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyUserSettingsData, undefined>;
  operationName: string;
}
export const getMyUserSettingsRef: GetMyUserSettingsRef;

export function getMyUserSettings(options?: ExecuteQueryOptions): QueryPromise<GetMyUserSettingsData, undefined>;
export function getMyUserSettings(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserSettingsData, undefined>;

interface GetMyUserSignatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserSignatureData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyUserSignatureData, undefined>;
  operationName: string;
}
export const getMyUserSignatureRef: GetMyUserSignatureRef;

export function getMyUserSignature(options?: ExecuteQueryOptions): QueryPromise<GetMyUserSignatureData, undefined>;
export function getMyUserSignature(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserSignatureData, undefined>;

