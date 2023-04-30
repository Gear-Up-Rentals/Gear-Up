import { Autocomplete, Pane, TextInput } from "evergreen-ui";

import React from "react";

const SearchTextField = (args) => {
  return (
    <Pane className={args.className}>
      <Autocomplete
        title={args.title}
        onChange={(val) => args.onChange(val)}
        items={args.items}
        allowOtherValues={false}
      >
        {(props) => {
          const { getInputProps, getRef, inputValue, openMenu } = props;
          return (
            <TextInput
              minWidth="100%"
              placeholder={args.placeholder}
              value={inputValue}
              ref={getRef}
              {...getInputProps({
                onFocus: () => {
                  openMenu();
                },
              })}
            />
          );
        }}
      </Autocomplete>
    </Pane>
  );
};

export default SearchTextField;
