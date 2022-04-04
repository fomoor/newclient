<template>
    <div class="container">
        <form>
            <div>
                <h1>Заполните форму</h1>
            </div>
            <div>
                <h2>Основная информация:</h2>
            </div>
            <div class="empty-fields">
                <input 
                    class="form-field"
                    :class="{ 'incorrect-field': $v.name.$error || agreement === true && !$v.name.required, 'correct-field': $v.name.required }" 
                    type="text" 
                    placeholder="Имя*" 
                    v-model.trim="$v.name.$model"
                >
                <div>
                    <span class="incorrect-field-msg" v-if="$v.name.$error || agreement === true && $v.$invalid === true">
                        <template v-if="!$v.name.required">
                            Поле обязательно для заполнения
                        </template>
                        <template v-else-if="!$v.name.alpha">
                            Поле должно содержать только буквы
                        </template>
                        <template v-else-if="!$v.name.maxLength">
                            Максимальная длинна поля - {{ $v.name.$params.maxLength.max }} символов
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.surname.$error || agreement === true && !$v.surname.required, 'correct-field': $v.surname.required }" 
                    type="text" 
                    placeholder="Фамилия*" 
                    v-model.trim="$v.surname.$model"
                >
                <div>
                    <span class="incorrect-field-msg" v-if="$v.surname.$error || agreement === true && $v.$invalid === true">
                        <template v-if="!$v.surname.required">
                            Поле обязательно для заполнения
                        </template>
                        <template v-else-if="!$v.surname.maxLength">
                            Длина поля не должна превышать {{ $v.surname.$params.maxLength.max }} символов
                        </template>
                        <template v-else-if="!$v.surname.alpha">
                            Поле должно содержать только буквы
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.secondname.$error,  'correct-field': $v.secondname.$model }" 
                    type="text" 
                    placeholder="Отчество" 
                    v-model.trim="$v.secondname.$model"
                >
                <div>            
                    <span class="incorrect-field-msg" v-if="$v.secondname.$error">
                        <template v-if="!$v.secondname.maxLength">
                            Длина поля не должна превышать {{ $v.secondname.$params.maxLength.max }} символов
                        </template>
                        <template v-else-if="!$v.secondname.alpha">
                            Поле должно содержать только буквы
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.birthday === null || agreement === true && !$v.birthday.required, 'correct-field': $v.birthday.required }"
                    type="text"
                    placeholder="Дата рождения*"
                    onfocus="this.type='date'"
                    v-model.trim="$v.birthday.$model"
                >
                <div>
                    <span class="incorrect-field-msg" v-if="$v.birthday.$error || agreement === true && $v.$invalid === true">
                        <template v-if="!$v.birthday.required">
                            Поле обязательно для заполнения
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.phone.$error || agreement === true && !$v.phone.required, 'correct-field': $v.phone.required }" 
                    type="tel" 
                    placeholder="Номер телефона*" 
                    v-model.trim="$v.phone.$model"
                >
                <div>
                    <span class="incorrect-field-msg" v-if="$v.phone.$error || agreement === true && $v.$invalid === true">
                        <template v-if="!$v.phone.required">
                            Поле обязательно для заполнения
                        </template>
                        <template v-else-if="!$v.phone.alpha">
                            Поле должно содержать только цифры
                        </template>
                        <template v-else-if="!$v.phone.betha">
                            Номер должен начинаться с 7
                        </template>
                        <template v-else-if="!$v.phone.maxLength">
                            Не больше {{ $v.phone.$params.maxLength.max }} символов
                        </template>
                        <template v-else-if="!$v.phone.minLength">
                            Не меньше {{ $v.phone.$params.minLength.min }} символов
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <select
                    class="form-field"
                    :class="{ 'correct-field': gender !== '' }"  
                    v-model="gender"
                >
                    <option disabled value="">Пол</option>
                    <option>Мужской</option>
                    <option>Женский</option>
                </select>
            </div>
            
            <div class="empty-fields">
                <input 
                    id="hidden-choise"
                    class="form-field"  
                    type="text"
                    placeholder="Группа клиентов*"
                    readonly
                    v-model.trim="clientsGroupSelected"
                >     
                <select
                    class="form-field"
                    :class="{ 
                        'incorrect-field': clientsGroupSelected.length === 0 && clientsGroup !== '' || agreement === true && clientsGroupSelected.length === 0, 
                        'correct-field': clientsGroupSelected.length 
                    }"
                    v-model="clientsGroup"
                    v-on:change="clientsGroupSelected.indexOf($v.clientsGroup.$model) === -1 
                        ? clientsGroupSelected.push($v.clientsGroup.$model) 
                        : clientsGroupSelected.splice(clientsGroupSelected.indexOf($v.clientsGroup.$model), 1)"
                >
                    <option disabled value="">Группа клиентов*</option>
                    <option>VIP</option>
                    <option>Проблемные</option>
                    <option>ОМС</option>
                </select>
                <span 
                    class="material-icons delete-array-icon" 
                    :class="{ 'hidden': clientsGroupSelected.length === 0 }" 
                    v-on:click="clientsGroupSelected.splice(0, clientsGroupSelected.length)"
                    >
                    clear
                </span>
                <div>
                    <span 
                        class="incorrect-field-msg" 
                        v-if="clientsGroupSelected.length === 0 && clientsGroup !== '' || agreement === true && clientsGroupSelected.length === 0"
                    >
                        Поле обязательно для заполнения
                    </span>
                </div>
            </div> 

            <div class="empty-fields">
                <select
                    class="form-field"
                    :class="{ 'correct-field': doctor !== '' }"  
                    v-model="doctor"
                >
                    <option disabled value="">Лечащий врач</option>
                    <option>Иванов</option>
                    <option>Захаров</option>
                    <option>Чернышева</option>
                </select>
            </div>

            <br />

            <div class="empty-fields check-agreement">
                <input type="checkbox" id="smsMailing" v-model="smsMailing" />
                <label for="smsMailing">Согласие на СМС-уведомления</label>
            </div>

            <div>
                <h2>Адрес:</h2>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.postIndex.$error,  'correct-field': $v.postIndex.$model }" 
                    type="text" 
                    placeholder="Почтовый индекс" 
                    v-model.trim="$v.postIndex.$model"
                >
                <div>            
                    <span class="incorrect-field-msg" v-if="$v.postIndex.$error">
                        <template v-if="!$v.postIndex.alpha">
                            Поле должно содержать только цифры
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.country.$error,  'correct-field': $v.country.$model }" 
                    type="text" 
                    placeholder="Страна" 
                    v-model.trim="$v.country.$model"
                > 
                <div>           
                    <span class="incorrect-field-msg" v-if="$v.country.$error">
                        <template v-if="!$v.country.alpha">
                            Поле должно содержать только буквы
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.region.$error,  'correct-field': $v.region.$model }" 
                    type="text" 
                    placeholder="Область" 
                    v-model.trim="$v.region.$model"
                >
                <div>            
                    <span class="incorrect-field-msg" v-if="$v.region.$error">
                        <template v-if="!$v.region.alpha">
                            Поле должно содержать только буквы
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.city.$error || agreement === true && !$v.city.required,  'correct-field': $v.city.required }" 
                    type="text" 
                    placeholder="Город*" 
                    v-model.trim="$v.city.$model"
                > 
                <div>           
                    <span class="incorrect-field-msg" v-if="$v.city.$error || agreement === true && !$v.city.required">
                        <template v-if="!$v.city.required">
                            Поле обязательно для заполнения
                        </template>
                        <template v-else-if="!$v.city.alpha">
                            Поле должно содержать только буквы
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'correct-field': $v.street }" 
                    type="text" 
                    placeholder="Улица" 
                    v-model.trim="$v.street"
                >
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'correct-field': $v.houseNumber }" 
                    type="text" 
                    placeholder="Номер дома" 
                    v-model.trim="$v.houseNumber"
                >
            </div>

            <div>
                <h2>Документ удостоверяющий личность:</h2>
            </div>

            <div class="empty-fields">
                <select
                    class="form-field"
                    :class="{ 'incorrect-field': agreement === true && passportType === '', 'correct-field': passportType !== '' }"  
                    v-model="passportType"
                >
                    <option disabled value="">Тип документа*</option>
                    <option>Паспорт</option>
                    <option>Свидетельство о рождении</option>
                    <option>Вод. удостоверение</option>
                    <option>Военный билет</option>
                </select>
                <div>
                    <span class="incorrect-field-msg" v-if=" agreement === true && passportType === '' ">Поле обязательно для заполнения</span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.passportSerial.$error,  'correct-field': $v.passportSerial.$model }" 
                    type="text" 
                    placeholder="Серия" 
                    v-model.trim="$v.passportSerial.$model"
                >     
                <div>       
                    <span class="incorrect-field-msg" v-if="$v.passportSerial.$error">
                        <template v-if="!$v.passportSerial.alpha">
                            Поле должно содержать только цифры
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.passportNumber.$error,  'correct-field': $v.passportNumber.$model }" 
                    type="text" 
                    placeholder="Номер" 
                    v-model.trim="$v.passportNumber.$model"
                >  
                <div>          
                    <span class="incorrect-field-msg" v-if="$v.passportNumber.$error">
                        <template v-if="!$v.passportNumber.alpha">
                            Поле должно содержать только цифры
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.passportIssued.$error,  'correct-field': $v.passportIssued.$model }" 
                    type="text" 
                    placeholder="Кем выдан" 
                    v-model.trim="$v.passportIssued.$model"
                >   
                <div>         
                    <span class="incorrect-field-msg" v-if="$v.passportIssued.$error">
                        <template v-if="!$v.passportIssued.alpha">
                            Поле должно содержать только буквы
                        </template>
                    </span>
                </div>
            </div>

            <div class="empty-fields">
                <input 
                    class="form-field" 
                    :class="{ 'incorrect-field': $v.passportDate === null || agreement === true && !$v.passportDate.required, 'correct-field': $v.passportDate.required }"
                    type="text"
                    placeholder="Дата выдачи*"
                    onfocus="this.type='date'"
                    v-model.trim="$v.passportDate.$model"
                >
                <div>
                    <span class="incorrect-field-msg" v-if="$v.passportDate.$error || agreement === true && !$v.passportDate.required">
                        <template v-if="!$v.passportDate.required">
                            Поле обязательно для заполнения
                        </template>
                    </span>
                </div>
            </div>

            <br />
            <div class="empty-fields check-agreement">
                <input type="checkbox" id="agreement" v-model="agreement" />
                <label for="agreement">Согласие на обработку персональных данных*</label>
            </div>
            
            <div class="success-block" :class="{ 'disabled': !clientAdded }">
                <span>Клиент успешно создан!</span><br />
                <span>Добавить нового?</span><br />
                <button style="margin-top: 15px" type="button" @click="reloadPage()">Добавить</button>
            </div>

            <br />
            <button :disabled="$v.$invalid || agreement === false" v-if="!clientAdded" @click="clientAdded = true">Отправить форму</button>
            <br />
            <br />
            <span v-if="!clientAdded"> * - поля обязательные для заполнения</span>
        </form>
    </div>
</template>

<script>
import { required, maxLength, minLength  } from 'vuelidate/lib/validators';

export default {
    name: 'regForm',
    data () {
        return {
            name: null,
            surname: null,
            secondname: null,
            birthday: null,
            phone: null,
            gender: '',
            clientsGroup: '',
            clientsGroupSelected: [],
            doctor: '',
            smsMailing: false,
            postIndex: null,
            country: null,
            region: null,
            city: null,
            street: null,
            houseNumber: null,
            passportType: '',
            passportSerial: null,
            passportNumber: null,
            passportIssued: null,
            passportDate: null,
            agreement: false,
            clientAdded: false
        }
    },

    validations: {
        name: {
            required,
            maxLength: maxLength(10),
            alpha: val => /^[а-яёa-z]*$/i.test(val)
        },
        surname: {
            required,
            maxLength: maxLength(10),
            alpha: val => /^[а-яёa-z]*$/i.test(val)
        },
        secondname: {
            maxLength: maxLength(10),
            alpha: val => /^[а-яёa-z]*$/i.test(val) || val === null
        },
        birthday: {
            required
        },
        phone: {
            required,
            minLength: minLength(11),
            maxLength: maxLength(11),
            alpha: val => /^[0-9]*$/i.test(val),
            betha: val => val[0] === '7'
        },
        clientsGroup: {
            required
        },
        clientsGroupSelected: {
            required
        },
        postIndex: {
            alpha: val => /^[0-9]*$/i.test(val) || val === null
        },
        country: {
            alpha: val => /^[а-яёa-z]*$/i.test(val) || val === null
        },
        region: {
            alpha: val => /^[а-яёa-z]*$/i.test(val) || val === null
        },
        city: {
            required,
            alpha: val => /^[а-яёa-z]*$/i.test(val)
        },
        passportSerial: {
            alpha: val => /^[0-9]*$/i.test(val) || val === null
        },
        passportNumber: {
            alpha: val => /^[0-9]*$/i.test(val) || val === null
        },
        passportIssued: {
            alpha: val => /^[а-яёa-z]*$/i.test(val) || val === null
        },
        passportDate: {
            required
        },
        passportType: {
            required
        }
    },
    methods: {
        reloadPage() {
            window.location.reload();
        }
    }

}

</script>