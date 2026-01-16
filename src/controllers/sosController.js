const db = require('../config/db');

const getEmergencyContact = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID es requerido' });
    }

    const record = await db('medical_records')
      .select('emergency_contact_phone')
      .where('user_id', userId)
      .first();

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'No se encontro ficha medica para este usuario' 
      });
    }

    let phone = record.emergency_contact_phone;

    if (!phone) {
      return res.status(404).json({ 
        success: false, 
        message: 'El usuario no tiene un telefono de emergencia registrado' 
      });
    }

    let cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

    if (cleanPhone.length === 9 && !cleanPhone.startsWith('+')) {
      cleanPhone = `+56${cleanPhone}`;
    } 
    else if (cleanPhone.length === 11 && !cleanPhone.startsWith('+')) {
      cleanPhone = `+${cleanPhone}`;
    }

    return res.status(200).json({ 
      success: true, 
      phone: cleanPhone, 
      originalPhone: phone 
    });

  } catch (error) {
    console.error('Error detallado:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error interno en la consulta de base de datos' 
    });
  }
};

module.exports = { getEmergencyContact };