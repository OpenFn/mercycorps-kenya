fn(state => {
  const myNumber = Math.floor(Math.random() * 100);
  console.log('This is myNumber', myNumber);

  return { ...state, myNumber };
});

upsert(
  'households',
  'case_id',
  {
    number: this.Math.floor(Math.random() * 100),
    form_id: dataValue('id'),
    consent: dataValue('form.hh_information.Participants_consent'),
    house_hold_id: dataValue('form.Household_information.hh_identification_number'),
    created_date: dataValue('form.Household_information.date_of_collectiontoday'),
    family_setup: dataValue('form.Household_information.family_type'),
    livelihood_zone: dataValue('form.Household_information.livelihood_zone'),
    functional_latrine: dataValue('form.Household_information.functional_latrine'),
    water_sources: dataValue('form.Household_information.the_acess_to_safe_water'),
    other_water_sources: dataValue('form.Household_information.othersstate_if_other_water_sources'),
    hand_washing_facilities: dataValue('form.Household_information.hand_washing_facilities'),
    Disposal_facility: dataValue('form.Household_information.refuse_disposal_facility'),

    child_mortal_28_days: dataValue('form.number_of_deaths_in_the_months.no_of_deaths_0_28days'),
    child_mortal_eleven_months: dataValue('form.number_of_deaths_in_the_months.no_of_deaths_29days_11months'),
    child_mortal_fifty_nine_months: dataValue('form.number_of_deaths_in_the_months.no_of_deaths_12_59months'),
    maternal_deaths: dataValue('form.number_of_deaths_in_the_months.no_of_maternal_deaths_0_42days'),
    other_deaths: dataValue('form.number_of_deaths_in_the_months.no_of_otherdeaths_notcounted'),

    county: dataValue('form.Household_information.The_CountyLabel.the_county'),
    sub_county: dataValue('form.Household_information.thesubcounty_label.the_subcounty'),
    ward: dataValue('form.Household_information.ward_details.the_ward'),
    location_l: dataValue('form.Household_information.question5.the_location'),
    village: dataValue('form.Household_information.thevillage_name.the_village'),
    new_village: dataValue('form.case.update.is_this_new_village'),
    system_list: dataValue('form.case.update.new_village'),

    house_hold_size: dataValue('form.Household_information.hh_count'),
    CU_name: dataValue('form.Household_information.the_cu_name'),
    linked_facility_in_cu: dataValue('form.Household_information.linked_facility_in_cu'),

    HHID_hh: dataValue('form.Household_information.HHID_hh'),

    completed_time: dataValue('metadata.timeEnd'),
    started_time: dataValue('metadata.timeStart'),
    user_name: dataValue('metadata.username'),

    received_on: dataValue('received_on'),

    form_link: dataValue("attachments['form.xml']['url']"), //dataValue('attachments'),
    hq_user: dataValue('metadata.username'),

    case_id: dataValue('form.case.@case_id'),
    srtt_village: 'SRTT_VILLAGE' + Math.floor(Math.random() * 100),
  },
  {
    setNull: "'undefined'",
    logValues: true,
  }
);

//Looping to get the chidren data
upsertMany(
  'hh_members',
  'case_id',
  state => {
    const dataArray = state.data.form.hh_members_registration || [];
    const azureHHmembers = dataArray.map((x, i) => {
      const hhCodes = x.pax_identifier_information.HHID_output.split('HH');
      const hhMemberId = `HH${hhCodes[1]}-${i}`;
      console.log('The hhMemberId is:', hhMemberId);

      return {
        //=============================My Loop values:=============
        number: hhMemberId,

        Participant_id: x.pax_identifier_information.hhm_id,

        fname: x.pax_identifier_information.PAX_info.first_name,
        mname: x.pax_identifier_information.PAX_info.middle_name,
        lname: x.pax_identifier_information.PAX_info.last_name,
        nickname: x.pax_identifier_information.PAX_info.nickname,

        gender: x.pax_identifier_information.PAX_info.sex,
        dob: x.pax_identifier_information.PAX_info.hhm_dob,
        mobileno: x.pax_identifier_information.PAX_info.hhm_phone_number,

        id_huduma: x.pax_identifier_information.PAX_info.id_number,
        relationship: x.pax_identifier_information.PAX_info.hhm_relationship,
        disability: x.pax_identifier_information.PAX_info.disability,
        participant_grp: x.pax_identifier_information.persons_info.pax_group,

        female_status: x.pax_identifier_information.special_groups.this_woman_is,
        // MUAC_value: x.pax_identifier_information.special_groups.MUAC_status_calc,
        MUAC_value: x.pax_identifier_information.special_groups.muac_value || 0,

        // delivery_date: x.pax_identifier_information.PAX_info.middle_name,
        source_of_livelihood: x.pax_identifier_information.special_groups.livelihood,
        mom_child_booklet: x.pax_identifier_information.has_motherchildbooklet,
        community_unit: x.pax_identifier_information.the_cu_name,

        // TODO: please check where these value are found ------------------
        // comm_frp_mobile: x.pax_identifier_information.chs_hh.question_list_chusla.chs_contact,
        // CHS_hh_number: x.pax_identifier_information.chs_hh.question_list_chusla.CHS_Household_Number,
        // -----------------------------------------------------------------

        facility_comm_unit: x.pax_identifier_information.linked_facility_in_cu,

        // health_insurance: x.pax_identifier_information.chs_hh.question_list_chusla.do_you_have_health_insurance_cover,
        // health_insurance_details: x.pax_identifier_information.PAX_info.middle_name,

        // birth_cert: x.pax_identifier_information.PAX_info.middle_name,
        // birth_cert_no: x.pax_identifier_information.chs_hh.question_list_chusla.birth_certificate_no,

        // orphan: x.pax_identifier_information.chs_hh.question_list_chusla.orphan,

        // other_health_insurance: x.pax_identifier_information.PAX_info.middle_name,

        // schooling: x.pax_identifier_information.chs_hh.question_list_chusla.in_school,

        // vitamin_given: x.pax_identifier_information.chs_hh.question_list_chusla.was_vitamin_a_given || '',
        // penta_3_given: x.pax_identifier_information.chs_hh.question_list_chusla.was_penta_3_given || '',
        // immunized: x.pax_identifier_information.chs_hh.question_list_chusla.is_a_child_fully_immunized_under_1_yr_old || '',
        // measles_rubella_immunized: x.pax_identifier_information.chs_hh.question_list_chusla.measles_rubella_at_2_years || '',
        // delivery_place: x.pax_identifier_information.chs_hh.question_list_chusla.state_the_place_of_delivery || '',

        full_name: x.pax_identifier_information.PAX_info.pax_full_name,
        age_months: x.pax_identifier_information.PAX_info.hhm_age_months,
        hhm_age_years: x.pax_identifier_information.PAX_info.hhm_age_years,
        under_5: x.pax_identifier_information.PAX_info.under_5,
        MUAC_status_calc: x.pax_identifier_information.special_groups.MUAC_status_calc || '',
        family_setup: x.pax_identifier_information.family_setup,
        orphan_second: x.case.update.orphan,
        fully_immunized_under_one: x.pax_identifier_information.fully_immunized_under_one,

        functional_latrine: x.pax_identifier_information.functional_latrine,
        mother_child_booklet: x.pax_identifier_information.special_groups.is_this_house_hold_given_mother_and_child_health_booklet,

        The_county: dataValue('form.Household_information.The_CountyLabel.the_county'),
        subcounty: dataValue('form.Household_information.thesubcounty_label.the_subcounty'),
        the_ward: x.pax_identifier_information.the_ward,
        The_location: x.pax_identifier_information.the_location,
        the_village: x.pax_identifier_information.the_village,
        srtt_village: 'SRTT_VILLAGE_ ' + x.pax_identifier_information.the_village,

        collected_by: x.pax_identifier_information.user_collected_is,
        date_of_collection: x.pax_identifier_information.date_of_collection,
        hhid_output: x.case.update.HHID_output,

        vitamin_a_under1: x.pax_identifier_information['vitamin_a_under1'],

        case_id: x.case['@case_id'],
        parent_case_id: dataValue('form.case.@case_id'), //foreign key for households

        GPS: x.pax_identifier_information.GPS,
        date_posted: new Date().toISOString(),
      };
    });

    return azureHHmembers;
  },

  { setNull: false, writeSql: true, logValues: false }
);
