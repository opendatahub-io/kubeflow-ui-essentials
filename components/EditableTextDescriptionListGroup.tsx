import * as React from 'react';
import { ExpandableSection, TextArea, TextInput } from '@patternfly/react-core';
import DashboardDescriptionListGroup, {
  DashboardDescriptionListGroupProps,
} from '~/components/DashboardDescriptionListGroup';
import FormFieldset from '~/components/FormFieldset';

type EditableTextDescriptionListGroupProps = Pick<
  DashboardDescriptionListGroupProps,
  'title' | 'contentWhenEmpty'
> & {
  value: string;
  saveEditedValue: (value: string) => Promise<void>;
  baseTestId?: string;
  isArchive?: boolean;
  editableVariant: 'TextInput' | 'TextArea';
  truncateMaxLines?: number;
};

const EditableTextDescriptionListGroup: React.FC<EditableTextDescriptionListGroupProps> = ({
  title,
  contentWhenEmpty,
  value,
  isArchive,
  saveEditedValue,
  baseTestId,
  editableVariant,
  truncateMaxLines = 12,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [unsavedValue, setUnsavedValue] = React.useState(value);
  const [isSavingEdits, setIsSavingEdits] = React.useState(false);
  const [isTextExpanded, setIsTextExpanded] = React.useState(false);

  const editableTextArea =
    editableVariant === 'TextInput' ? (
      <TextInput
        autoFocus
        data-testid={baseTestId && `${baseTestId}-input`}
        aria-label={`Text input for editing ${title}`}
        value={unsavedValue}
        onChange={(_event, v) => setUnsavedValue(v)}
        isDisabled={isSavingEdits}
      />
    ) : (
      <TextArea
        autoFocus
        data-testid={baseTestId && `${baseTestId}-input`}
        aria-label={`Text box for editing ${title}`}
        value={unsavedValue}
        onChange={(_event, v) => setUnsavedValue(v)}
        isDisabled={isSavingEdits}
        rows={24}
        resizeOrientation="vertical"
      />
    );
  return (
    <DashboardDescriptionListGroup
      title={title}
      isEmpty={!value}
      contentWhenEmpty={contentWhenEmpty}
      isEditable={!isArchive}
      isEditing={isEditing}
      isSavingEdits={isSavingEdits}
      groupTestId={baseTestId && `${baseTestId}-group`}
      editButtonTestId={baseTestId && `${baseTestId}-edit`}
      saveButtonTestId={baseTestId && `${baseTestId}-save`}
      cancelButtonTestId={baseTestId && `${baseTestId}-cancel`}
      contentWhenEditing={<FormFieldset component={editableTextArea} />}
      onEditClick={() => {
        setUnsavedValue(value);
        setIsEditing(true);
      }}
      onSaveEditsClick={async () => {
        setIsSavingEdits(true);
        try {
          await saveEditedValue(unsavedValue);
        } finally {
          setIsSavingEdits(false);
        }
        setIsEditing(false);
      }}
      onDiscardEditsClick={() => {
        setUnsavedValue(value);
        setIsEditing(false);
      }}
    >
      <ExpandableSection
        data-testid={baseTestId}
        variant="truncate"
        truncateMaxLines={truncateMaxLines}
        toggleText={isTextExpanded ? 'Show less' : 'Show more'}
        onToggle={(_event, isExpanded) => setIsTextExpanded(isExpanded)}
        isExpanded={isTextExpanded}
      >
        {value}
      </ExpandableSection>
    </DashboardDescriptionListGroup>
  );
};

export default EditableTextDescriptionListGroup;
