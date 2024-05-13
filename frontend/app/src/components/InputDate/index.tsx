import { StatusBar } from 'expo-status-bar';
import { Text, TouchableHighlight, Modal } from 'react-native';
import React, { useState } from 'react';
import styles from "../../styles";
import { Dayjs } from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';
import functionLib from '../../services/functions';
import { UseFormSetValue } from 'react-hook-form';

type Props = {
    data_evento: Date;
    set_data_evento: UseFormSetValue<any>;
    label_value: string;
}

const InputDate = ({ data_evento, set_data_evento, label_value }: Props) => {

    const utils = new functionLib();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleDateChange = (date: any) => {
        setDatePickerVisibility(false)
        const data = date.date;
        set_data_evento(label_value, data)
    };

    return (
        <>
            <Modal
                onRequestClose={() => setDatePickerVisibility(false)}
                visible={isDatePickerVisible}
                transparent={false}
                animationType="slide"
            >
                <DateTimePicker
                    mode="single"
                    date={new Date(data_evento)}
                    onChange={handleDateChange}
                />
            </Modal>
            <TouchableHighlight
                onPress={() => setDatePickerVisibility(true)}
                style={[styles.boxBorder]}
            >
                <Text
                    style={styles.textLabel}
                >
                    {utils.toReadableDate(data_evento)}
                </Text>
            </TouchableHighlight>
        </>
    )
}

export default InputDate;