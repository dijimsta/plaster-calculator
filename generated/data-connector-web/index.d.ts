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

export interface CreateQuoteItemTemplateData {
  quoteItemTemplate_insert: QuoteItemTemplate_Key;
}

export interface CreateQuoteItemTemplateVariables {
  id: UUIDString;
  name: string;
  hasKeywords: boolean;
  keywords: string[];
}

export interface CreateQuoteTemplateData {
  quoteTemplate_insert: QuoteTemplate_Key;
}

export interface CreateQuoteTemplateVariables {
  id: UUIDString;
  name: string;
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

export interface DeleteQuoteItemTemplateData {
  quoteItemTemplateConfig_deleteMany: number;
  quoteItemTemplate_delete?: QuoteItemTemplate_Key | null;
}

export interface DeleteQuoteItemTemplateVariables {
  id: UUIDString;
}

export interface EnsureProjectQuestionnaireData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
}

export interface EnsureProjectQuestionnaireVariables {
  projectId: UUIDString;
}

export interface EnsureSystemQuoteItemTemplatesData {
  wallsPlasterboardQuantitySource: QuantitySource_Key;
  wetWallsVillaboardQuantitySource: QuantitySource_Key;
  ceilingsPlasterboardQuantitySource: QuantitySource_Key;
  coveCorniceQuantitySource: QuantitySource_Key;
  wetFloorsFcSheetQuantitySource: QuantitySource_Key;
  doorSetsQuantitySource: QuantitySource_Key;
  wallsPlasterboardItemTemplate: QuoteItemTemplate_Key;
  wetWallsVillaboardItemTemplate: QuoteItemTemplate_Key;
  ceilingsPlasterboardItemTemplate: QuoteItemTemplate_Key;
  coveCorniceItemTemplate: QuoteItemTemplate_Key;
  wetFloorsFcSheetItemTemplate: QuoteItemTemplate_Key;
  doorSetsItemTemplate: QuoteItemTemplate_Key;
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
  } & Project_Key;
  floorplanPages: ({
    id: UUIDString;
    pageNumber: number;
    scaleMmPerPx?: number | null;
    ceilingHeightMm?: number | null;
    overlayJson?: string | null;
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
      hasKeywords: boolean;
      keywords: string[];
      sortOrder: number;
      quantitySourceId?: UUIDString | null;
    } & QuoteItemTemplate_Key;
  })[];
}

export interface GetQuoteReadinessVariables {
  projectId: UUIDString;
}

export interface ListMyCompaniesData {
  companies: ({
    id: UUIDString;
    teamId: string;
    companyName: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
    primaryContactId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Company_Key)[];
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

export interface Reminder_Key {
  id: UUIDString;
  __typename?: 'Reminder_Key';
}

export interface SetMyCompanyPrimaryContactData {
  company_update?: Company_Key | null;
}

export interface SetMyCompanyPrimaryContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
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

export interface UpdateQuoteItemTemplateData {
  quoteItemTemplate_update?: QuoteItemTemplate_Key | null;
}

export interface UpdateQuoteItemTemplateVariables {
  id: UUIDString;
  name: string;
  hasKeywords: boolean;
  keywords: string[];
}

export interface UpdateQuoteStatusData {
  quote_update?: Quote_Key | null;
}

export interface UpdateQuoteStatusVariables {
  id: UUIDString;
  status: string;
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
  (): QueryRef<ListMyCompaniesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyCompaniesData, undefined>;
  operationName: string;
}
export const listMyCompaniesRef: ListMyCompaniesRef;

export function listMyCompanies(options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, undefined>;
export function listMyCompanies(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, undefined>;

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

interface EnsureSystemQuoteItemTemplatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<EnsureSystemQuoteItemTemplatesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<EnsureSystemQuoteItemTemplatesData, undefined>;
  operationName: string;
}
export const ensureSystemQuoteItemTemplatesRef: EnsureSystemQuoteItemTemplatesRef;

export function ensureSystemQuoteItemTemplates(): MutationPromise<EnsureSystemQuoteItemTemplatesData, undefined>;
export function ensureSystemQuoteItemTemplates(dc: DataConnect): MutationPromise<EnsureSystemQuoteItemTemplatesData, undefined>;

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

interface CreateQuoteItemTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemTemplateVariables): MutationRef<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteItemTemplateVariables): MutationRef<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
  operationName: string;
}
export const createQuoteItemTemplateRef: CreateQuoteItemTemplateRef;

export function createQuoteItemTemplate(vars: CreateQuoteItemTemplateVariables): MutationPromise<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
export function createQuoteItemTemplate(dc: DataConnect, vars: CreateQuoteItemTemplateVariables): MutationPromise<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;

interface UpdateQuoteItemTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemTemplateVariables): MutationRef<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteItemTemplateVariables): MutationRef<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
  operationName: string;
}
export const updateQuoteItemTemplateRef: UpdateQuoteItemTemplateRef;

export function updateQuoteItemTemplate(vars: UpdateQuoteItemTemplateVariables): MutationPromise<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
export function updateQuoteItemTemplate(dc: DataConnect, vars: UpdateQuoteItemTemplateVariables): MutationPromise<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;

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
  (): QueryRef<ListQuotesForTeamData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuotesForTeamData, undefined>;
  operationName: string;
}
export const listQuotesForTeamRef: ListQuotesForTeamRef;

export function listQuotesForTeam(options?: ExecuteQueryOptions): QueryPromise<ListQuotesForTeamData, undefined>;
export function listQuotesForTeam(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuotesForTeamData, undefined>;

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

