import { StatusBar } from 'expo-status-bar';
import { Text, TouchableHighlight, Modal } from 'react-native';
import React, { useState } from 'react';
import styles from "../../styles";
import { Dayjs } from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';
import functionLib from '../../services/functions';

type Props = {
    data_evento: Dayjs;
    set_data_evento: any;
    label_value?: string;
}

const InputDate = ({ data_evento, set_data_evento, label_value }: Props) => {

    const utils = new functionLib();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleDateChange = (date: any) => {
        setDatePickerVisibility(false)
        const data = date.date;
        label_value ? set_data_evento(label_value, data) : set_data_evento(data);
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
                    date={data_evento}
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
                    {utils.toDate(data_evento)}
                </Text>
            </TouchableHighlight>
        </>
    )
}

export default InputDate;