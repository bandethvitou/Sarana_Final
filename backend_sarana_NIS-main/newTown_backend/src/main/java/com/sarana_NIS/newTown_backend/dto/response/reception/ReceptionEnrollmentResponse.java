package com.sarana_NIS.newTown_backend.dto.response.reception;

public class ReceptionEnrollmentResponse {
    private Long studentId;
    private Long enrollmentId;
    private Long feeId;
    private String receiptNumber;

    public ReceptionEnrollmentResponse(Long studentId, Long enrollmentId, Long feeId, String receiptNumber) {
        this.studentId = studentId;
        this.enrollmentId = enrollmentId;
        this.feeId = feeId;
        this.receiptNumber = receiptNumber;
    }

    // Getters and Setters
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getEnrollmentId() { return enrollmentId; }
    public void setEnrollmentId(Long enrollmentId) { this.enrollmentId = enrollmentId; }

    public Long getFeeId() { return feeId; }
    public void setFeeId(Long feeId) { this.feeId = feeId; }

    public String getReceiptNumber() { return receiptNumber; }
    public void setReceiptNumber(String receiptNumber) { this.receiptNumber = receiptNumber; }
}