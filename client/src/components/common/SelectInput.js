import React from "react";

export default ({ options }) => {
    if (options != null || options != undefined) {
        const optionList = options.map((option, index) => {
            return (
                <option key="index" value={option.value}>
                    {option.name}
                </option>
            );
        });
    }
    return <select />;
};
